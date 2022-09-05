import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { TextField } from '@mui/material';

import React, { FC, memo } from 'react';

import { useEffectSkipRender, useQueryParam, useSearch } from '../../../../hooks';

import style from './AnimeSearch.module.css';

export const AnimeSearchInner: FC = () => {
  const { currentQueryParams, getQueryMethodWithKey } = useQueryParam<AnimeQueryUrl>();
  const queryMethodsSearch = getQueryMethodWithKey('search');

  const { inputValue, setInputValue, debounceValue } = useSearch(queryMethodsSearch.get() ?? '');

  const handleOnChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };
  const dispatch = useAppDispatch();

  /**
   * My intention is to prevent the first search query api call when the app is first loaded. However, due to
   * the strict mode which trigger the app to perform the callback inside normal useEffect 2 times, I have to
   * skip 2 renders to prevent this behavior of strict mode.
   */
  useEffectSkipRender(2, () => {
    queryMethodsSearch.set(debounceValue);
    const currentParamModel = AnimeQueryMapper.fromUrl(currentQueryParams);
    dispatch(getAnimeList(new AnimeQuery({ ...currentParamModel, search: debounceValue })));
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
