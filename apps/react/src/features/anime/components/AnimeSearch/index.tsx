import { AnimeQueryDto } from '@js-camp/core/dtos/animeQuery.dto';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { TextField } from '@mui/material';

import React, { FC, memo } from 'react';

import { useEffectSkipFirstRender, useQueryParam, useSearch } from '../../../../hooks';

import style from './AnimeSearch.module.css';

export const AnimeSearchInner: FC = () => {
  const { currentQueryParams, getQueryMethodWithKey } = useQueryParam<AnimeQueryDto>();
  const queryMethodsSearch = getQueryMethodWithKey('search');

  const { inputValue, setInputValue, debounceValue } = useSearch(queryMethodsSearch.get() ?? '');

  const handleOnChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };
  const dispatch = useAppDispatch();
  useEffectSkipFirstRender(() => {
    queryMethodsSearch.set(debounceValue);
    const currentParamDto = AnimeQueryMapper.fromDto(currentQueryParams);
    dispatch(getAnimeList(new AnimeQuery({ ...currentParamDto, search: debounceValue })));
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
