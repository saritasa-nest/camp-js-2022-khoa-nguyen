import { AnimeDetail } from '@js-camp/core/models';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<AnimeDetail>({
  selectId: anime => anime.id,
});

/** Anime details state. */
export interface AnimeDetailsStateInner {

  /** Whether anime details is loading or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string | null;

  /** Whether delete anime is loading or not. */
  readonly isLoadingDelete: boolean;
}

export const initialState = entityAdapter.getInitialState<AnimeDetailsStateInner>({
  isLoading: false,
  isLoadingDelete: false,
});

export type AnimeDetailsState = typeof initialState;
