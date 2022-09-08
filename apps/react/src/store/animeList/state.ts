import { Anime } from '@js-camp/core/models';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

/** Anime state. */
export interface AnimeState extends EntityState<Anime> {

  /** Whether the anime list is loading or not. */
  readonly isLoading: boolean;

  /** Whether the next page of anime list is loading or not. */
  readonly isLoadingNextPage: boolean;

  /** Total item. */
  readonly totalItems: number;

  /** Next page url from api. */
  readonly nextPageUrl: string | null;

  /** Whether delete anime is loading or not. */
  readonly isLoadingDelete: boolean;

  /** Error. */
  readonly error?: string | null;

}

export const animeAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

export const initialState: AnimeState = animeAdapter.getInitialState({
  isLoading: false,
  totalItems: 0,
  nextPageUrl: null,
  isLoadingNextPage: false,
  isLoadingDelete: false,

});
