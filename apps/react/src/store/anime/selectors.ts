import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectById: selectByAnimeId } = entityAdapter.getSelectors();

/** Select anime by ID. */
export const selectAnimeDetailById = createSelector(
  (state: RootState, id: EntityId) => (selectByAnimeId(state.anime, id)),
  anime => anime,
);

/** Select anime loading state. */
export const selectIsAnimeDetailLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);
