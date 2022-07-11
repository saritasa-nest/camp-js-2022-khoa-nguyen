import { Immerable, OmitImmerable } from './immerable';

/** Login. */
export class Login extends Immerable {

  /** User email. */
  public readonly email: string;

  /** User password. */
  public readonly password: string;

  public constructor(data: PostInitArgs) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

type PostInitArgs = OmitImmerable<Login>;
