import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects all studios from store. */
export const selectStudios = createSelector(
  (state: RootState) => selectAll(state.studios),
  studios => studios,
);
