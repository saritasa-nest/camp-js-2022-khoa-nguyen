import { Immerable, OmitImmerable } from './immerable';

/** Login. */
export class Login extends Immerable {

  /** User email. */
  public readonly email: string;

  /** User password. */
  public readonly password: string;

  public constructor(data: LoginInitArgs) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

type LoginInitArgs = OmitImmerable<Login>;

/** Login errors. */
export class ErrorLogin extends Immerable {

  /** None field errors. */
  public readonly noneFieldErrors?: readonly string[];

  public constructor(data: ErrorLoginInitArgs) {
    super();
    this.noneFieldErrors = data.noneFieldErrors;
  }
}

type ErrorLoginInitArgs = OmitImmerable<ErrorLogin>;
