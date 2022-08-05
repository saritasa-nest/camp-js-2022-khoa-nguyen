import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorLogin, HttpError, Login, Token } from '@js-camp/core/models';

import { BehaviorSubject, ignoreElements, map, merge, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { key, url } from '../../../../constants';

import { isFieldsDefined } from '../../../../core/guards//nonNullField.guard';

import { AuthService, ErrorValidation, LocalStoreService } from '../../../../core/services';

/** Handle login feature. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  /** Login info. */
  public readonly loginInfo$ = new Subject<Login>();

  /** Token info. */
  public readonly token$: Observable<HttpError<ErrorLogin> | Token>;

  /** Error login. */
  public readonly errorLogin$ = new BehaviorSubject<string>('');

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly localStoreService: LocalStoreService,
    private readonly router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.token$ = this.loginInfo$.pipe(
      map(loginInfo => this.authService.login(loginInfo)),
      switchMap(value$ => value$),
    );
  }

  private readonly subscriptionManager$ = new Subject<void>();

  /** @inheritdoc */
  public ngOnInit(): void {
    const loginSideEffect$ = this.token$.pipe(
      tap(value => {
        if (value instanceof HttpError) {
          this.errorLogin$.next(value.detail);
          this.changeDetectorRef.markForCheck();
        } else {
          this.localStoreService.setValue(key.token, value.access);
          this.router.navigate([url.home]);
        }
      }),
    );
    merge(loginSideEffect$).pipe(ignoreElements(), takeUntil(this.subscriptionManager$))
      .subscribe();

  }

  /** Register form init. */
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /** Get login form controls. */
  public get loginFormControl(): typeof this.loginForm.controls {
    return this.loginForm.controls;
  }

  /** Get error of field. */
  public get errorControl(): ErrorValidation<string> {
    return {
      email: {
        required: {
          check: this.loginFormControl.email.errors?.['required'],
          message: 'Email is required.',
        },
        isEmail: {
          check: this.loginFormControl.email.errors?.['email'],
          message: 'This field has to be email.',
        },
      },
      password: {
        required: {
          check: this.loginFormControl.password.errors?.['required'],
          message: 'Password is required.',
        },
      },
    };
  }

  /** Handle submit login. */
  public onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const loginInfo = this.loginForm.getRawValue();
      if (!isFieldsDefined(loginInfo)) {
        return;
      }
      this.loginInfo$.next(new Login(loginInfo));
    }
  }
}
