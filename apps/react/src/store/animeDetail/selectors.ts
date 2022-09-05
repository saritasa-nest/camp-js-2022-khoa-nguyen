import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectById: selectByAnimeId } = entityAdapter.getSelectors();

/** Select anime by ID. */
export const selectAnimeDetailsById = createSelector(
  (state: RootState, id: EntityId) => (selectByAnimeId(state.animeDetail, id)),
  animeDetails => animeDetails,
);

/** Select anime loading state. */
export const selectIsAnimeDetailLoading = createSelector(
  (state: RootState) => state.animeDetail.isLoading,
  isLoading => isLoading,
);
