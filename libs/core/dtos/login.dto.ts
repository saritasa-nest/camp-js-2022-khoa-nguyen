export interface LoginDto {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;

}

/** Date error DTO. */
export interface ErrorLoginDto {

  /** Errors for a specific field. */
  readonly non_field_errors?: readonly string[];
}
