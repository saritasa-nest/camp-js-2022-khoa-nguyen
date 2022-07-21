import { KEY_SEARCHING, KEY_SORTING } from '../constants';
import { LocalStorageService } from '../service/localStorage';

/** Reset value in local storage.*/
export function resetStorage(): void {
  LocalStorageService.setValue(KEY_SEARCHING, '');
  LocalStorageService.setValue(KEY_SORTING, '');
}
