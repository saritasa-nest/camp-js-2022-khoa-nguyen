import { Immerable, OmitImmerable } from './immerable';

/** Errors that returned from backend. */
export class HttpError<T> extends Immerable {

  /** Data of error. */
  public readonly data?: T;

  /** Detail of error. */
  public readonly detail: string;

  /** Code of error. */
  public readonly code?: string;

  public constructor(data: PostInitArgs<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
    this.code = data.code;
  }
}

type PostInitArgs<T> = OmitImmerable<HttpError<T>>;
