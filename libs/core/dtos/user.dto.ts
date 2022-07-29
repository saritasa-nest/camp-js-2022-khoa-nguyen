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
export type ErrorUserDto = Readonly<Record<keyof UserDto, readonly string[]>>;
