import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Token, User } from '@js-camp/core/models';

import { BehaviorSubject, catchError, of } from 'rxjs';

import { isFieldsDefined } from '../../../../core/guards/nonNullField.guard';

import { AuthService, ErrorValidation } from '../../../../core/services';

/** Register form. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent {
  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  /** Watch if form is submitted or not.  */
  public isSubmitted$ = new BehaviorSubject<boolean>(false);

  // public createMemberResult$: BehaviorSubject<Token>;

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

  /** Get error form. */
  public get errorControl(): ErrorValidation {
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
      },

      firstName: {
        required: {
          check: this.registerFormControl.firstName.errors?.['required'],
          message: 'First name is required.',
        },
      },

      lastName: {
        required: {
          check: this.registerFormControl.lastName.errors?.['required'],
          message: 'Last name is required.',
        },
      },

      password: {
        required: {
          check: this.registerFormControl.password.errors?.['required'],
          message: 'Password is required.',
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

  private isValidConfirmPassword(password: string, passwordConfirm: string): boolean {
    if (password.localeCompare(passwordConfirm) === 0) {
      return true;
    }
    this.registerFormControl.confirmPassword.setErrors({ notMatch: true });
    return false;
  }

  /** Handle form submit. */
  public onSubmitRegister(): void {
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
      this.authService.createUser(userInfo).subscribe();
    }
  }
}
