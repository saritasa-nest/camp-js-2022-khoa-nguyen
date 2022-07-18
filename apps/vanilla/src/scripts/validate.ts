interface Validation {

  /** Password element. */
  passwordElement: Readonly<HTMLInputElement> ;

  /** Confirm Password element. */
  confirmPasswordElement: Readonly<HTMLInputElement>;
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
  const errorElement = confirmPasswordElement.parentElement?.parentElement?.querySelector('.form__span-error');
  if (errorElement == null) {
    return false;
  }
  if (passwordValue === confirmPasswordValue) {
    errorElement.innerHTML = '';
    return true;
  }
  errorElement.innerHTML = message;
  return false;
}
