
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

const {
  selectAll: selectAllAnime,
} = animeAdapter.getSelectors();

/** Selects anime list. */
export const selectAmineList = createSelector(
  (state: RootState) => selectAllAnime(state.animeList),
  animeList => animeList,
);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);

export const selectTotalAnimeCount = createSelector(
  (state: RootState) => state.animeList.totalItems,
  totalItems => totalItems,
);

export const selectNextPage = createSelector(
  (state: RootState) => state.animeList.nextPageUrl,
  nextPage => nextPage,
);

export const selectIsLoadingNextPage = createSelector(
  (state: RootState) => state.animeList.isLoadingNextPage,
  isLoadingNextPage => isLoadingNextPage,
);
