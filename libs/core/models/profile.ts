import { Immerable, OmitImmerable } from './immerable';

/** Profile. */
export class Profile extends Immerable {

  /** Email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Avatar. */
  public readonly avatar?: string;

  /** Created date. */
  public readonly created: Date;

  /** Modifier date. */
  public readonly modified: Date;

  public constructor(data: PostInitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
    this.created = data.created;
    this.modified = data.modified;
  }
}

type PostInitArgs = OmitImmerable<Profile>;
