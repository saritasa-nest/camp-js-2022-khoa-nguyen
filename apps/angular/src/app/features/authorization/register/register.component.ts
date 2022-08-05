import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorUser, HttpError, Token, User } from '@js-camp/core/models';

import { BehaviorSubject, ignoreElements, map, merge, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { KEY_TOKEN } from '../../../../constants';

import { isDefined, isFieldsDefined } from '../../../../core/guards/nonNullField.guard';

import { AuthService, ErrorValidation, LocalStoreService } from '../../../../core/services';

/** Register form. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent implements OnInit {

  /** Watch if form is submitted or not.  */
  public isSubmitted$ = new BehaviorSubject<boolean>(false);

  /** Register form init. */
  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

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
          check: this.registerFormControl.email.errors?.['required'],
          message: 'Email is required.',
        },
        isEmail: {
          check: this.registerFormControl.email.errors?.['email'],
          message: 'This field has to be email.',
        },

        httpError: {
          check: this.registerFormControl.email.errors?.['httpError'],
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
          check: this.registerFormControl.firstName.errors?.['required'],
          message: 'First name is required.',
        },
        httpError: {
          check: this.registerFormControl.firstName.errors?.['httpError'],
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
          check: this.registerFormControl.lastName.errors?.['required'],
          message: 'Last name is required.',
        },
        httpError: {
          check: this.registerFormControl.lastName.errors?.['httpError'],
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
          check: this.registerFormControl.password.errors?.['required'],
          message: 'Password is required.',
        },
        httpError: {
          check: this.registerFormControl.password.errors?.['httpError'],
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
          check: this.registerFormControl.confirmPassword.errors?.['required'],
          message: 'Confirm password is required.',
        },
        notMatch: {
          check: this.registerFormControl.confirmPassword.errors?.['notMatch'],
          message: 'This field is not match with your current password, please input again.',
        },
      },
    };
  }

  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStoreService: LocalStoreService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
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
          for (const key in value.data) {
            if (value.data[key as keyof ErrorUser] == null) {
              continue;
            }
            this.registerForm.get(key)?.setErrors({ httpError: true });
          }
          this.changeDetectorRef.markForCheck();
        } else {
          this.localStoreService.setValue(KEY_TOKEN, value.access);
        }
      }),
    );

    merge(createUserSideEffect$).pipe(ignoreElements(), takeUntil(this.subscriptionManager$))
      .subscribe();
  }

  private isValidConfirmPassword(password: string, passwordConfirm: string): boolean {
    if (password.localeCompare(passwordConfirm) === 0) {
      return true;
    }
    this.registerFormControl.confirmPassword.setErrors({ notMatch: true });
    return false;
  }

  /** Handle form submit. */
  public onSubmitRegister(): void {
    this.registerForm.markAllAsTouched();
    this.isSubmitted$.next(true);
    const formData = this.registerForm.getRawValue();
    if (!isFieldsDefined(formData)) {
      return;
    }
    const { email, password, firstName, lastName } = formData;
    const userInfo: User = new User({
      email, password, firstName, lastName,
    });
    this.isValidConfirmPassword(password, formData.confirmPassword);
    if (this.registerForm.valid) {
      this.registerInfo$.next(userInfo);
    }
  }
}
