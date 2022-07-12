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

/** User signup info errors. */
export class ErrorUser extends Immerable {

  /** Email errors. */
  public readonly email: readonly string[];

  /** Password errors. */
  public readonly password: readonly string[];

  /** First name errors. */
  public readonly firstName: readonly string[];

  /** Last name errors. */
  public readonly lastName: readonly string[];

  /** Avatar errors. */
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
