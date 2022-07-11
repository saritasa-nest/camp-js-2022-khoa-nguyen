export interface UserDto {

  /** Email. */
  readonly email: string;

  /** First name of user. */
  readonly first_name: string;

  /** Last name of user. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

  /** Password. */
  readonly avatar?: string;

}

/** Date error DTO. */
export interface ErrorUserDto {

  /** Errors for a specific field. */
  readonly email: readonly string[];

  /** Errors for a specific field. */
  readonly password: readonly string[];

  /** Errors for a specific field. */
  readonly first_name: readonly string[];

  /** Errors for a specific field. */
  readonly last_name: readonly string[];

  /** Errors for a specific field. */
  readonly avatar: readonly string[];
}
