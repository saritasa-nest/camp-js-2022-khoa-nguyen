import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects all studios from store. */
export const selectListStudios = createSelector(
  (state: RootState) => selectAll(state.studiosList),
  studios => studios,
);

/** Selects studios loading state. */
export const selectIsStudiosListLoading = createSelector(
  (state: RootState) => state.studiosList.isLoading,
  isLoading => isLoading,
);

/** Selects create studios loading state. */
export const selectIsCreateStudioLoading = createSelector(
  (state: RootState) => state.studiosList.isCreateStudioLoading,
  isCreateStudioLoading => isCreateStudioLoading,
);
