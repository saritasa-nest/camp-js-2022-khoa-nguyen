import { DataError } from './dataError';
import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class HttpError extends Immerable {

  /** Id. */
  public readonly data: DataError | null;

  /** Name. */
  public readonly detail: string;

  public constructor(data: PostInitArgs) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }
}

type PostInitArgs = OmitImmerable<HttpError>;
