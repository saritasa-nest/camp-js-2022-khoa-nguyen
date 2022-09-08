import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';

import { animeListSlice } from './animeList/slice';
import { animeSlice } from './anime/slice';

import { authSlice } from './auth/slice';

import { genresSlice } from './genre/slice';
import { studiosSlice } from './studios/slice';
import { genresListSlice } from './genreList/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    genres: genresSlice.reducer,
    genresList: genresListSlice.reducer,
    animeList: animeListSlice.reducer,
    studios: studiosSlice.reducer,
    anime: animeSlice.reducer,
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
