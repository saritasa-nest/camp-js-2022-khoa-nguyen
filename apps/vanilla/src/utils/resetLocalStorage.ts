import { KEY_SEARCHING, KEY_SORTING } from '../constants';
import { setValueToLocalStorage } from '../service/localStorage';

/** Check for null or undefined element.*/
export function resetStorage(): void {
  setValueToLocalStorage(KEY_SEARCHING, '');
  setValueToLocalStorage(KEY_SORTING, '');
}
