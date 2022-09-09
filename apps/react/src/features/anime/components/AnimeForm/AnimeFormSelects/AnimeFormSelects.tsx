import { Genre, Studio } from '@js-camp/core/models';
import {
  createNewGenre,
  fetchGenresList,
} from '@js-camp/react/store/genreList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import {
  createNewStudio,
  fetchStudiosList,
} from '@js-camp/react/store/studiosList/dispatchers';
import { useEffect } from 'react';

import {
  AppSelectWithSearch,
  FormItemWrapper,
} from '../../../../../components';

export const AnimeFormSelects = () => {
  const dispath = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGenresList('')).then(result =>
      setInitialGenreList(result.payload as Genre[]));
    dispatch(fetchStudiosList('')).then(result =>
      setInitialStudioList(result.payload as Studio[]));
  }, []);

  const combineGenreList = initialGenreList.concat(genres).concat(genresList);
  const combineStudioList = initialStudioList
    .concat(studios)
    .concat(studiosList);

  return (
    <div>
      {' '}
      <FormItemWrapper name="genres">
        <AppSelectWithSearch
          onSearchChange={value => dispatch(fetchGenresList(value))}
          isCreateLoading={isCreateGenreLoading}
          isListLoading={isGenreListLoading}
          onClickAddNewItem={value => dispatch(createNewGenre(value))}
          defaultValue={
            animeInfo && getCurrentList<Genre>(animeInfo.genresIds, genres)
          }
          searchPlaceholder="Search genres. e.g: Action"
          list={genresList.map(item => ({ value: item.name }))}
          label={'Genres'}
          id={'genres'}
          onValueChange={value =>
            formik.setFieldValue(
              'genres',
              value.map(item =>
                combineGenreList.find(genre => item === genre.name)),
            )
          }
        />
      </FormItemWrapper>
      <FormItemWrapper name="studios">
        <AppSelectWithSearch
          onSearchChange={value => dispatch(fetchStudiosList(value))}
          isCreateLoading={isCreateStudioLoading}
          isListLoading={isStudiosListLoading}
          onClickAddNewItem={value => dispatch(createNewStudio(value))}
          defaultValue={
            animeInfo && getCurrentList<Studio>(animeInfo.studioIds, studios)
          }
          searchPlaceholder="Search studio. e.g: OLM"
          list={studiosList.map(item => ({ value: item.name }))}
          label={'Studios'}
          id={'studios'}
          onValueChange={value =>
            formik.setFieldValue(
              'studios',
              value.map(item =>
                combineStudioList.find(studio => item === studio.name)),
            )
          }
        />
      </FormItemWrapper>
    </div>
  );
};
