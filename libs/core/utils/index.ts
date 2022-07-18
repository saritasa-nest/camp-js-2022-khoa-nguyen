
/**
 * Format date into mm/dd/yyyy.
 * @param dateToFormat Date to format.
 */
export function formatDate(dateToFormat: Date): string {
  const newDate = new Date(dateToFormat);
  return newDate.toLocaleDateString('en-us');
}
