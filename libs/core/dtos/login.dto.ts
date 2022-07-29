export interface LoginDto {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;

}

/** Login error DTO. */
export interface ErrorLoginDto {

  /** Non field errors. */
  readonly non_field_errors?: readonly string[];
}
