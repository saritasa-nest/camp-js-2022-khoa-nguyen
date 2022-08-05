import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/** Custom form validators. */
@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {

  /**
   * Validate match password.
   * @param password Current password.
   * @param confirmPassword Password to confirm.
   */
  public matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): void => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['notMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
