/**
 *  Query and add message error into tag span with class error.
 * @param inputElement Input element.
 * @param message Error message.
 */
export function queryErrorSpan(inputElement: HTMLInputElement, message: readonly string[]): void {
  if (!inputElement) {
    return;
  }
  const { parentElement } = inputElement;
  const errorElement = parentElement?.querySelector('.form__item-error');
  if (errorElement) {
    errorElement.innerHTML = message.map(item => item).join(' ');
  }
}
