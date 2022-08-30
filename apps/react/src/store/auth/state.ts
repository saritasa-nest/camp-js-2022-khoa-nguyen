import { ErrorLogin, ErrorUser, HttpError, Token } from '@js-camp/core/models';

/** Token state. */
export interface AuthState {

  /** Token. */
  readonly token: Token | null;

  /** Error. */
  readonly error?: HttpError<ErrorLogin | ErrorUser> ;

  /** Whether the token is loading or not. */
  readonly isLoading: boolean;

  /** Whether user logged in or not. */
  readonly isAuthorized: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthorized: true,
  token: null,
};
