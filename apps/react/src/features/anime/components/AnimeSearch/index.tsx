import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { TextField } from '@mui/material';

import React, { FC, memo } from 'react';

import { useEffectSkipFirstRender, useSearch } from '../../../../hooks';

import style from './AnimeSearch.module.css';

export const AnimeSearchInner: FC = () => {
  const { inputValue, setInputValue, debounceValue } = useSearch();
  const handleOnChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };
  const dispatch = useAppDispatch();
  useEffectSkipFirstRender(() => {
    dispatch(getAnimeList({ search: debounceValue }));
  }, [debounceValue]);

  return (
    <div>
      <TextField
        value={inputValue}
        onChange={handleOnChangeValue}
        className={style['anime-search__input']}
        placeholder="e.g.Naruto, ..."
        type="search"
      />
    </div>
  );
};

export const AnimeSearch = memo(AnimeSearchInner);
