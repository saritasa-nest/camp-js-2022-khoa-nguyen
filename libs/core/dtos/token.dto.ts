export interface TokenDto {

  /** Token refresh. */
  readonly refresh: string;

  /** Token access. */
  readonly access: string;

}

export interface ErrorTokenDto {

  /** Token error. */
  readonly token: readonly string [];

  /** Non field errors. */
  readonly non_field_errors: readonly string [];
}
