import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { AnimeListQueryOptionsMapper } from '@js-camp/core/mappers';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { TypeModel } from '@js-camp/core/models';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { getAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { FC } from 'react';

import { AppSelect, SelectItem } from '../../../../components';
import { useQueryParam } from '../../../../hooks';

const listFilter: SelectItem[] = Object.values(TypeModel)
  .filter(item => item !== TypeModel.Default)
  .map(item => ({
    value: item,
  }));

export const AnimeFilter: FC = () => {
  const { queryMethods, currentQueryParams } = useQueryParam<AnimeQueryUrl>();
  const dispatch = useAppDispatch();
  const currentModelParam = AnimeQueryMapper.fromUrl(currentQueryParams);
  const handleFilterByTypes = (value: string | string[]) => {
    const _value = value as TypeModel[];
    const typesUrl = _value
      .map(item => AnimeListQueryOptionsMapper.typeModelToDto[item])
      .join(',');
    queryMethods.set('types', typesUrl);
    dispatch(
      getAnimeList(new AnimeQuery({ ...currentModelParam, types: _value })),
    );
  };
  return (
    <AppSelect
      id="anime-filter"
      multiple
      defaultValue={currentModelParam.types}
      label="Filter by types"
      onChangeSideEffect={handleFilterByTypes}
      list={listFilter}
    />
  );
};
