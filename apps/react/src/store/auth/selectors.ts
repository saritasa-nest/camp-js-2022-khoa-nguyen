import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Select is logged in state. */
export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.isAuthorized,
  isAuthorized => isAuthorized,
);

/** Selects auth error state. */
export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);

/** Selects auth token. */
export const selectAuthToken = createSelector(
  (state: RootState) => state.auth.token,
  token => token,
);
