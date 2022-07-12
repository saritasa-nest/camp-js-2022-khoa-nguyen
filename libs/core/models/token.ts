import { Immerable, OmitImmerable } from './immerable';

/** Token. */
export class Token extends Immerable {

  /** Token refresh. */
  public readonly refresh: string;

  /** Token access. */
  public readonly access: string;

  public constructor(data: PostInitArgs) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type PostInitArgs = OmitImmerable<Token>;
