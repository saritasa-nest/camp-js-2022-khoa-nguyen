import {
  AnimeQuery,
  OrderingQuery,
  SortingQuery,
} from '@js-camp/core/models/animeQuery';
import { FC } from 'react';
import { useAppDispatch } from '@js-camp/react/store/store';
import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import {
  AnimeQueryMapper,
  SortingMapper,
} from '@js-camp/core/mappers/animeQuery.mapper';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';

import { useQueryParam } from '../../../../hooks';
import { AppSelect, SelectItem } from '../../../../components';

import style from './AnimeSorting.module.css';

const listSorting: SelectItem[] = Object.values(SortingQuery).map(
  (item): SelectItem => ({ value: item }),
);

const listOrdering: SelectItem[] = Object.values(OrderingQuery).map(
  (item): SelectItem => ({ value: item }),
);

export const AnimeSorting: FC = () => {
  const { currentQueryParams, queryMethods } = useQueryParam<AnimeQueryUrl>();
  const dispatch = useAppDispatch();
  const currentParamModel = AnimeQueryMapper.fromUrl(currentQueryParams);

  const handleSorting = (value: string | string[]) => {
    const _value = value as SortingQuery;
    queryMethods.set('sorting', SortingMapper.toUrl(_value));
    dispatch(
      getAnimeList(new AnimeQuery({ ...currentParamModel, sorting: _value })),
    );
  };

  const handleOrdering = (value: string | string[]) => {
    const _value = value as OrderingQuery;
    queryMethods.set('ordering', _value);
    dispatch(
      getAnimeList(new AnimeQuery({ ...currentParamModel, ordering: _value })),
    );
  };
  return (
    <div className={style['anime-sorting']}>
      <AppSelect
        defaultValue={currentParamModel.sorting}
        onChangeSideEffect={handleSorting}
        id="sort-anime"
        label="Sort by"
        isNoneSelection
        list={listSorting}
      />
      <AppSelect
        disabled={currentParamModel.sorting == null}
        defaultValue={currentParamModel.ordering}
        onChangeSideEffect={handleOrdering}
        id="order-anime"
        label="Order by"
        list={listOrdering}
      />
    </div>
  );
};
