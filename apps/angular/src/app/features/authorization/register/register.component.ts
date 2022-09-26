import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorUser, HttpError, Token, User } from '@js-camp/core/models';

import { BehaviorSubject, ignoreElements, map, merge, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { key, url } from '../../../../constants';

import { isDefined, isFieldsDefined } from '../../../../core/guards/nonNullField.guard';

import { AuthService, ErrorValidation, LocalStoreService, CustomValidatorService } from '../../../../core/services';

/** Register form. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authorization.component.css', './register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent implements OnInit, OnDestroy {

  /** Register form init. */
  public registerForm: FormGroup;

  /** Get register form controls. */
  public get registerFormControl(): typeof this.registerForm.controls {
    return this.registerForm.controls;
  }

  /** Error list. */
  public readonly errorList$ = new BehaviorSubject<ErrorUser>(
    new ErrorUser({
      email: [''],
      password: [''],
      lastName: [''],
      firstName: [''],
      avatar: [''],
    }),
  );

  /** Register info. */
  public readonly registerInfo$ = new Subject<User>();

  /** Token info. */
  public readonly token$: Observable<Token | HttpError<ErrorUser>>;

  private readonly subscriptionManager$ = new Subject<void>();

  /** Get error form. */
  public get errorControl(): ErrorValidation<string> {
    return {
      email: {
        required: {
          check: this.registerFormControl['email'].errors?.['required'],
          message: 'Email is required.',
        },
        isEmail: {
          check: this.registerFormControl['email'].errors?.['email'],
          message: 'This field has to be email.',
        },

        httpError: {
          check: this.registerFormControl['email'].errors?.['httpError'],
          message$: this.errorList$.pipe(
            map(error => {
              if (!isDefined(error.email)) {
                return '';
              }
              return error.email.join(', ');
            }),
          ),
        },
      },

      firstName: {
        required: {
          check: this.registerFormControl['firstName'].errors?.['required'],
          message: 'First name is required.',
        },
        httpError: {
          check: this.registerFormControl['firstName'].errors?.['httpError'],
          message$: this.errorList$.pipe(
            map(error => {
              if (!isDefined(error.firstName)) {
                return '';
              }
              return error.firstName.join(', ');
            }),
          ),
        },
      },

      lastName: {
        required: {
          check: this.registerFormControl['lastName'].errors?.['required'],
          message: 'Last name is required.',
        },
        httpError: {
          check: this.registerFormControl['lastName'].errors?.['httpError'],
          message$: this.errorList$.pipe(
            map(error => {
              if (!isDefined(error.lastName)) {
                return '';
              }
              return error.lastName.join(', ');
            }),
          ),
        },
      },

      password: {
        required: {
          check: this.registerFormControl['password'].errors?.['required'],
          message: 'Password is required.',
        },
        httpError: {
          check: this.registerFormControl['password'].errors?.['httpError'],
          message$: this.errorList$.pipe(
            map(error => {
              if (!isDefined(error.password)) {
                return '';
              }
              return error.password.join('');
            }),
          ),
        },
      },

      confirmPassword: {
        required: {
          check: this.registerFormControl['confirmPassword'].errors?.['required'],
          message: 'Confirm password is required.',
        },
        notMatch: {
          check: this.registerFormControl['confirmPassword'].errors?.['notMatch'],
          message: 'This field is not match with your current password, please input again.',
        },
      },
    };
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly localStoreService: LocalStoreService,
    private readonly customValidatorService: CustomValidatorService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.customValidatorService.matchPassword('password', 'confirmPassword'),
    });

    this.token$ = this.registerInfo$.pipe(
      map(userInfo => this.authService.createUser(userInfo)),
      switchMap(value$ => value$),
    );
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    const createUserSideEffect$ = this.token$.pipe(
      tap(value => {
        if (value instanceof HttpError) {
          if (value.data == null) {
            throw new Error('Invalid error.');
          }
          this.errorList$.next(value.data);
          for (const keyValue in value.data) {
            if (value.data[keyValue as keyof ErrorUser] == null) {
              continue;
            }
            this.registerForm.get(keyValue)?.setErrors({ httpError: true });
          }
          this.changeDetectorRef.markForCheck();
        } else {
          this.localStoreService.setValue<Token>(key.token, value);
          this.router.navigate([url.home]);
        }
      }),
    );

    merge(createUserSideEffect$).pipe(ignoreElements(), takeUntil(this.subscriptionManager$))
      .subscribe();
  }

  /** Handle form submit. */
  public onSubmitRegister(): void {
    this.registerForm.markAllAsTouched();
    const formData = this.registerForm.getRawValue();
    if (!isFieldsDefined(formData)) {
      return;
    }
    const { email, password, firstName, lastName } = formData;
    const userInfo: User = new User({
      email, password, firstName, lastName,
    });
    if (this.registerForm.valid) {
      this.registerInfo$.next(userInfo);
    }
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionManager$.next();
    this.subscriptionManager$.complete();
  }

}
