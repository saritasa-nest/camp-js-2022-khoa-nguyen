export namespace TextService {

  /**
   * Replace empty value with  --.
   * @param text Text to verify.
   */
  export function replaceEmptyValue(text: string | undefined): string {
    if (text == null || text === '') {
      return '--';
    }
    return text;
  }
}
