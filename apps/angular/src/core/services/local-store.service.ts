import { Injectable } from '@angular/core';

/** Local store service. */
@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {

  /**
   * Get values by key from local storage.
   * @param key The key by which the value is stored.
   * @returns Return null if there is no value or key, otherwise return value corresponding.
   */
  public getValue<T>(key: string): T | null {
    const localValue = localStorage.getItem(key);
    if (localValue != null) {
      return JSON.parse(localValue);
    }
    return null;
  }

  /**
   * Add or write values by key to local storage.
   * @param key The key by which the value is stored.
   * @param value Value that needs to be stored.
   */
  public setValue<T>(key: string, value: T): void {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Remove key from local storage.
   * @param key The key that need to be removed.
   */
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
