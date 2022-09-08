import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects all genres from store. */
export const selectListGenres = createSelector(
  (state: RootState) => selectAll(state.genresList),
  genres => genres,
);

/** Selects genres loading state. */
export const selectIsGenresListLoading = createSelector(
  (state: RootState) => state.genresList.isLoading,
  isLoading => isLoading,
);

/** Selects create genres loading state. */
export const selectIsCreateGenreLoading = createSelector(
  (state: RootState) => state.genresList.isCreateGenreLoading,
  isCreateGenreLoading => isCreateGenreLoading,
);
