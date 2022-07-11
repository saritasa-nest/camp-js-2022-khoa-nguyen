/** Date error DTO. */
export interface DataErrorDto<T> {

  /** Errors for a specific field. */
  readonly email: readonly string[];

  /** Errors for a specific field. */
  readonly password: readonly string[];

  /** Errors for a specific field. */
  readonly first_name: readonly string[];

  /** Errors for a specific field. */
  readonly last_name: readonly string[];

  /** Errors for a specific field. */
  readonly avatar: readonly string[];
}
