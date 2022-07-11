import { Immerable, OmitImmerable } from './immerable';

/** Data errors. */
export class DataError extends Immerable {

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

  public constructor(data: PostInitArgs) {
    super();
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
  }
}

type PostInitArgs = OmitImmerable<DataError>;
