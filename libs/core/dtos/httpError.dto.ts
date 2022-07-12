
export interface HttpErrorDto<T> extends Error {

  /** Error data. */
  readonly data?: T;

  /** Error detail. */
  readonly detail: string;

  /** Error detail. */
  readonly code: string;
}
