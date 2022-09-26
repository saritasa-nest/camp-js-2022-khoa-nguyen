import { Studio } from '@js-camp/core/models/studio';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Studio>({
  selectId: studio => studio.id,
});

/** Studios state. */
interface StudioStateInner {

  /** Error. */
  readonly error?: string;

  /** Whether the studios are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<StudioStateInner>({
  isLoading: true,
});

export type StudioState = typeof initialState;
