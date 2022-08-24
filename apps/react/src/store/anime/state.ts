import { Anime } from '@js-camp/core/models';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

/** Anime state. */
export interface AnimeState extends EntityState<Anime> {

  /** Whether the anime list is loading or not. */
  readonly isLoading: boolean;

}

export const animeBaseAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

export const initialState: AnimeState = animeBaseAdapter.getInitialState({
  isLoading: false,
});
