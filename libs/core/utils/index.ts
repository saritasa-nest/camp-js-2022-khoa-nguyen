
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
  const optionList = selectElement.querySelectorAll('option') as NodeListOf<HTMLOptionElement>;
  optionList.forEach(option => {
    if (!defaultValue) {
      return;
    }
    if (option.value === defaultValue) {
      option.setAttribute('selected', 'true');
    }
  });
}
