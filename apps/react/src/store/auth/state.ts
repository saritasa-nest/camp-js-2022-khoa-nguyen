import { HttpError, Login, Token } from '@js-camp/core/models';

/** Token state. */
export interface AuthState {

  /** Token. */
  readonly token: Token | null;

  /** Error. */
  readonly error?: HttpError<Login> ;

  /** Whether the token are loading or not. */
  readonly isLoading: boolean;

  /** Whether user logged in or not. */
  readonly isAuth: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  token: null,
};
