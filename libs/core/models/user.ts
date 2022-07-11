import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

  /** Email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Password. */
  public readonly password: string;

  /** Avatar. */
  public readonly avatar?: string;

  public constructor(data: PostInitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.avatar = data.avatar;
  }
}

type PostInitArgs = OmitImmerable<User>;

/** Data errors. */
export class ErrorUser extends Immerable {

  /** Id. */
  public readonly email: readonly string[];

  /** Id. */
  public readonly password: readonly string[];

  /** Id. */
  public readonly firstName: readonly string[];

  /** Id. */
  public readonly lastName: readonly string[];

  /** Id. */
  public readonly avatar: readonly string[];

  public constructor(data: ErrorInitArgs) {
    super();
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
  }
}

type ErrorInitArgs = OmitImmerable<ErrorUser>;
