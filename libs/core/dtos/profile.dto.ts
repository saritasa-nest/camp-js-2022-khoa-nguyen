export interface ProfileDto {

  /** Email. */
  readonly email: string;

  /** First name of user. */
  readonly first_name: string;

  /** Last name of user. */
  readonly last_name: string;

  /** Avatar of user. */
  readonly avatar?: string;

  /** Created date. */
  readonly created: string;

  /** Modifier date. */
  readonly modified: string;

}
