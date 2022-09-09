
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

/** Select anime delete loading state. */
export const setIsDeleteAnimeLoading = createSelector(
  (state: RootState) => state.animeList.isLoadingDeleteAnime,
  isLoadingDeleteAnime => isLoadingDeleteAnime,
);

/** Select anime delete loading state. */
export const selectErrorDelete = createSelector(
  (state: RootState) => state.animeList.error,
  error => error,
);

/** Select anime create loading state. */
export const setIsCreateAnimeLoading = createSelector(
  (state: RootState) => state.animeList.isLoadingCreateAnime,
  isLoading => isLoading,
);

/** Select anime update loading state. */
export const selectIsUpdateLoading = createSelector(
  (state: RootState) => state.animeList.isLoadingUpdateAnime,
  isLoading => isLoading,
);
