import { Immerable, OmitImmerable } from './immerable';

/** Login. */
export class Login extends Immerable {

  /** User email. */
  public readonly email: string;

  /** User password. */
  public readonly password: string;

  public constructor(data: LoginModel) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

type LoginModel = OmitImmerable<Login>;

/** Login errors. */
export class ErrorLogin extends Immerable {

  /** None field errors. */
  public readonly noneFieldErrors?: readonly string[];

  public constructor(data: ErrorLoginType) {
    super();
    this.noneFieldErrors = data.noneFieldErrors;
  }
}

type ErrorLoginType = OmitImmerable<ErrorLogin>;
