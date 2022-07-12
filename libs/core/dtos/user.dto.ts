export interface UserDto {

  /** Email. */
  readonly email: string;

  /** First name of user. */
  readonly first_name: string;

  /** Last name of user. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

  /** Avatar. */
  readonly avatar?: string;

}

/** Date error DTO. */
export interface ErrorUserDto {

  /** Errors for a email field. */
  readonly email: readonly string[];

  /** Errors for a password field. */
  readonly password: readonly string[];

  /** Errors for first name field. */
  readonly first_name: readonly string[];

  /** Errors for last name field. */
  readonly last_name: readonly string[];

  /** Errors for avatar field. */
  readonly avatar: readonly string[];
}
