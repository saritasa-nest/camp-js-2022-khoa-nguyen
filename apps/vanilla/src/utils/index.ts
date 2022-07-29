
/**
 * Set default select option when reload page.
 * @param selectElement Select element.
 * @param defaultValue Value that need to be on default.
 */
export function setDefaultSelected(selectElement: HTMLSelectElement, defaultValue: string): void {
  const optionList = selectElement.querySelectorAll('option');
  optionList.forEach(option => {
    if (option.value === defaultValue) {
      option.setAttribute('selected', 'true');
    }
  });
}

/**
 * Navigate pages.
 * @param url The url of page with need to be navigated.
 */
export function navigate(url: string): void {
  window.location.href = url;
}

/**
 * Throw errors.
 * @param error Error catched.
 * @param message Message of error.
 */
export function throwError(error: unknown, message: string): void {
  if (error instanceof Error) {
    throw new Error(`${message} ${error.message}`);
  } else {
    throw new Error('Unexpected error!');
  }
}
