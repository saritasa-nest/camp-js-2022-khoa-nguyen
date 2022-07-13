interface Validation {

  /** Password element. */
  passwordElement: HTMLInputElement;

  /** Confirm Password element. */
  confirmPasswordElement: HTMLInputElement;
}

/**
 * Validate password and confirm password feature.
 * @param validationObject HTML input of password.
 * @param message Error message.
 */
export function validateConfirmPassword(validationObject: Validation, message: string): boolean {
  const { passwordElement, confirmPasswordElement } = validationObject;
  const passwordValue = passwordElement?.value;
  const confirmPasswordValue = confirmPasswordElement?.value;
  const errorElement = confirmPasswordElement.parentElement?.querySelector('.form__item_span-error');
  if (!errorElement) {
    return false;
  }
  if (passwordValue === confirmPasswordValue) {
    errorElement.innerHTML = '';
    return true;
  }
  errorElement.innerHTML = message;
  return false;
}
