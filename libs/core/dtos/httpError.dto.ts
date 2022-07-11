
export interface HttpErrorDto<T> extends Error {

  /** Error data. */
  readonly data: readonly T[];

  /** Error detail. */
  readonly detail: string;
}
