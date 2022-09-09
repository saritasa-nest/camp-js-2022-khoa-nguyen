import { Anime } from '@js-camp/core/models';
import { createEntityAdapter } from '@reduxjs/toolkit';

/** Anime state. */
export interface AnimeInnerState {

  /** Whether the anime list is loading or not. */
  readonly isLoading: boolean;

  /** Whether the next page of anime list is loading or not. */
  readonly isLoadingNextPage: boolean;

  /** Total item. */
  readonly totalItems: number;

  /** Next page url from api. */
  readonly nextPageUrl: string | null;

  /** Whether delete anime is loading or not. */
  readonly isLoadingDeleteAnime: boolean;

  /** Whether delete anime is loading or not. */
  readonly isLoadingCreateAnime: boolean;

  /** Whether delete anime is loading or not. */
  readonly isLoadingUpdateAnime: boolean;

  /** Error. */
  readonly error?: string | null;

}

export const animeAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

export const initialState = animeAdapter.getInitialState<AnimeInnerState>({
  isLoading: false,
  totalItems: 0,
  nextPageUrl: null,
  isLoadingNextPage: false,
  isLoadingDeleteAnime: false,
  isLoadingCreateAnime: false,
  isLoadingUpdateAnime: false,
});

export type AnimeState = typeof initialState;
