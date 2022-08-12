type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

/**
 * Checks if a value is defined.
 * @param value Value defined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

/**
 * Checks if all fields value is defined.
 * @param fields Some object or form fields.
 */
export function isFieldsDefined<T>(fields: T): fields is NonNullableFields<T> {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      if (!isDefined(fields[key])) {
        return false;
      }
    }
  }
  return true;
}
