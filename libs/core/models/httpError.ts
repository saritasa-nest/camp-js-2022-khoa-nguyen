import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class HttpError<T> extends Immerable {

  /** Id. */
  public readonly data: T;

  /** Name. */
  public readonly detail: string;

  public constructor(data: PostInitArgs<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }
}

type PostInitArgs<T> = OmitImmerable<HttpError<T>>;
