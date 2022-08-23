import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Select is logged in state. */
export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.isAuth,
  isAuth => isAuth,
);

/** Selects auth error state. */
export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);
