interface Validation {

  /** Password element. */
  passwordElement: HTMLInputElement;

  /** Confirm Password element. */
  confirmPasswordElement: HTMLInputElement;
}

/**
 * Validate password and confirm password feature.
 * @param validationObject HTML input of password.
 * @param message Message of Error.
 */
export function validate(validationObject: Validation, message: string): Boolean {
  const { passwordElement, confirmPasswordElement } = validationObject;
  const passwordValue = passwordElement?.value;
  const confirmPasswordValue = confirmPasswordElement?.value;
  if (passwordValue === confirmPasswordValue) {
    return true;
  }
  const errorElement = confirmPasswordElement.parentElement?.querySelector('.error');
  if (errorElement) {
    errorElement.innerHTML = message;
  }
  return false;
}
