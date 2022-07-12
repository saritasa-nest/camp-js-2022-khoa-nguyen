import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class HttpError<T> extends Immerable {

  /** Id. */
  public readonly data?: T;

  /** Name. */
  public readonly detail: string;

  /** Name. */
  public readonly code?: string;

  public constructor(data: PostInitArgs<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
    this.code = data.code;
  }
}

type PostInitArgs<T> = OmitImmerable<HttpError<T>>;
