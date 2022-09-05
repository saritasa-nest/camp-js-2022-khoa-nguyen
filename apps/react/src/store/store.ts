import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';

import { animeSlice } from './anime/slice';
import { animeDetailsSlice } from './animeDetail/slice';

import { authSlice } from './auth/slice';

import { genresSlice } from './genre/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    genres: genresSlice.reducer,
    anime: animeSlice.reducer,
    animeDetail: animeDetailsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // We need to disable this check to allow ES6 classes in Redux.
    // You can find more info about this middleware in docs:
    // https://redux-toolkit.js.org/api/serializabilityMiddleware
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
