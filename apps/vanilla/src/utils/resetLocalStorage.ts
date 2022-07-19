import { KEY_SEARCHING, KEY_SORTING } from '../constants';
import { setValueToLocalStorage } from '../service/localStorage';

/** Reset value in local storage.*/
export function resetStorage(): void {
  setValueToLocalStorage(KEY_SEARCHING, '');
  setValueToLocalStorage(KEY_SORTING, '');
}
