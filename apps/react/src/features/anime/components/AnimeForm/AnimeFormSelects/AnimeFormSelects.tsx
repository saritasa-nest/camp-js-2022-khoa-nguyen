import { Genre, Studio } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import {
  createNewGenre,
  fetchGenresList,
} from '@js-camp/react/store/genreList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import {
  createNewStudio,
  fetchStudiosList,
} from '@js-camp/react/store/studiosList/dispatchers';
import { FormikProps } from 'formik';
import { FC, useEffect, useState } from 'react';

import {
  AppSelectWithSearch,
  FormItemWrapper,
} from '../../../../../components';
import { AnimeFormValidation } from '../formSetting';
import { useAnimeFormData } from '../hooks';

/**
 * @param ids List ids of genres or studios.
 * @param list List all genres or studios (fetch from api).
 */
function getCurrentList<T extends { id: number; name: string; }>(
  ids: readonly number[],
  list: T[],
): (string | undefined)[] {
  return ids.map(item => list.find(listItem => listItem.id === item)?.name);
}

interface Props {

  /** Info of anime selected. */
  readonly animeInfo?: AnimeEdit;

  /** Formik. */
  readonly formik: FormikProps<AnimeFormValidation>;
}

export const AnimeFormSelects: FC<Props> = ({ animeInfo, formik }) => {
  const dispatch = useAppDispatch();
  const {
    isCreateGenreLoading,
    isGenreListLoading,
    genres,
    genresList,
    isCreateStudioLoading,
    studios,
    isStudiosListLoading,
    studiosList,
  } = useAnimeFormData();

  const [initialGenreList, setInitialGenreList] = useState<Genre[]>(genresList);
  const [initialStudioList, setInitialStudioList] =
    useState<Studio[]>(studiosList);
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
    <>
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
    </>
  );
};
