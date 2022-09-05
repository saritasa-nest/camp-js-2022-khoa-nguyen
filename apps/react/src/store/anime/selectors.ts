
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

const {
  selectAll: selectAllAnime,
} = animeAdapter.getSelectors();

/** Selects anime list. */
export const selectAmineList = createSelector(
  (state: RootState) => selectAllAnime(state.anime),
  animeList => animeList,
);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

/** Select is logged in state. */
export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.isAuthorized,
  isAuthorized => isAuthorized,
);

export const selectTotalAnimeCount = createSelector(
  (state: RootState) => state.anime.totalItems,
  totalItems => totalItems,
);

export const selectNextPage = createSelector(
  (state: RootState) => state.anime.nextPageUrl,
  nextPage => nextPage,
);

export const selectIsLoadingNextPage = createSelector(
  (state: RootState) => state.anime.isLoadingNextPage,
  isLoadingNextPage => isLoadingNextPage,
);
