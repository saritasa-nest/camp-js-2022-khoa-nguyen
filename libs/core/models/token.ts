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

/** Token errors. */
export class ErrorToken extends Immerable {

  /** None field errors. */
  public readonly noneFieldErrors?: readonly string[];

  /** Token errors. */
  public readonly token?: readonly string[];

  public constructor(data: ErrorInitArgs) {
    super();
    this.token = data.token;
    this.noneFieldErrors = data.noneFieldErrors;
  }
}

type ErrorInitArgs = OmitImmerable<ErrorToken>;
