import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { ErrorValidation } from '../../../../core/services';

/** Handle login feature. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public constructor(private readonly formBuilder: FormBuilder) {}

  /** Register form init. */
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /** Get login form controls. */
  public get loginFormControl(): typeof this.loginForm.controls {
    return this.loginForm.controls;
  }

  /** Error list. */
  public readonly errorLogin$ = new BehaviorSubject<string>('');

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

  public onSubmitLogin() {
    console.log(this.loginForm.getRawValue());
  }
}
