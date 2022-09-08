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

  /** Whether the create studios is loading or not. */
  readonly isCreateStudioLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<StudioStateInner>({
  isLoading: false,
  isCreateStudioLoading: false,
});

export type StudioState = typeof initialState;
