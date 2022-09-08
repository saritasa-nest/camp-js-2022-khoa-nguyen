import { Genre } from '@js-camp/core/models/genre';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

/** Genres state. */
interface GenreStateInner {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;

  /** Whether the create genres is loading or not. */
  readonly isCreateGenreLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<GenreStateInner>({
  isLoading: false,
  isCreateGenreLoading: false,
});

export type GenreState = typeof initialState;
