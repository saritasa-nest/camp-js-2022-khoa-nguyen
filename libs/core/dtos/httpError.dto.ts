
export interface Data {
  readonly [key: string]: string[];
}

export interface HttpErrorDto<T> extends Error {

  /** Error data. */
  readonly data?: T;

  /** Error detail. */
  readonly detail: string;

  /** Error code. */
  readonly code: string;
}
