import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class Token extends Immerable {

  /** Id. */
  public readonly refresh: string;

  /** Name. */
  public readonly access: string;

  public constructor(data: PostInitArgs) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type PostInitArgs = OmitImmerable<Token>;
