
/**
 * Format date into mm/dd/yyyy.
 * @param dateToFormat Date to format.
 */
export function formatDate(dateToFormat: Date): string {
  const newDate = new Date(dateToFormat);
  return newDate.toLocaleDateString('en-us');
}

/**
 * Set default select option when reload page.
 * @param selectElement Select element.
 * @param defaultValue Value that need to be on default.
 */
export function setDefaultSelected(selectElement: HTMLSelectElement, defaultValue: string): void {
  const optionList = selectElement.querySelectorAll('option');
  optionList.forEach(option => {
    if (defaultValue === null || defaultValue === undefined) {
      return;
    }
    if (option.value === defaultValue) {
      option.setAttribute('selected', 'true');
    }
  });
}

/**
 * Query and add message error into tag span with class error.
 * @param inputElement Input element.
 * @param message Error message.
 */
export function queryErrorSpan(inputElement: HTMLInputElement, message: readonly string[]): void {
  if (inputElement === null || inputElement === undefined) {
    return;
  }
  const parentElement = inputElement.parentElement?.parentElement;
  const errorElement = parentElement?.querySelector('.form__span-error');
  if (errorElement === null || errorElement === undefined || message === undefined || message === null) {
    return;
  }
  errorElement.innerHTML = message.map(item => item).join(' ');
}

/**
 * Navigate pages.
 * @param url The url of page with need to be navigated.
 */
export function navigate(url: string): void {
  window.location.href = url;
}
