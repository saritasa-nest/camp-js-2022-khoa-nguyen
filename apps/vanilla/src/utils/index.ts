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
