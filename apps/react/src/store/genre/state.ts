import { Genre } from '@js-camp/core/models/genre';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

/** Genres state. */
export interface GenreStateInner {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<GenreStateInner>({
  isLoading: true,
});

export type GenreState = typeof initialState;
