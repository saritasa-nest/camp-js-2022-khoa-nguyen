import { Genre, Studio } from '@js-camp/core/models';
import {
  AnimeEdit,
} from '@js-camp/core/models/animeEdit';
import {
  createNewGenre,
  fetchGenresList,
} from '@js-camp/react/store/genreList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import {
  createNewStudio,
  fetchStudiosList,
} from '@js-camp/react/store/studiosList/dispatchers';
import { LoadingButton } from '@mui/lab';
import { Switch, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useEffect } from 'react';

import {
  AppSelectWithSearch,
  FormInputItem,
  FormItemWrapper,
} from '../../../../components';

import styles from './AnimeEditCreateForm.module.css';
import { AnimeFormSimpleInputs } from './AnimeFormSimpleInputs';
import {
  AnimeForm,
  getInitialValue,
  INITIAL_CREATE_VALUE,
  validationSchema,
} from './formSetting';
import { useAnimeFormData } from './hooks';
import { AnimeFormMapper } from './mapper';

interface Props {

  /** Anime info. */
  readonly data?: AnimeEdit;

  /** Handle form submit. */
  readonly onFormSubmit: (value: AnimeEdit) => void;
}

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

export const AnimeEditCreateForm: FC<Props> = ({ data, onFormSubmit }) => {
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

  const handleSubmit = (value: AnimeForm) => {
    const animeEditModel = AnimeFormMapper.fromFormValue(value);
    onFormSubmit(animeEditModel);
  };
  const formik = useFormik({
    validationSchema,
    initialValues: data ?
      getInitialValue(data, genres, studios) :
      INITIAL_CREATE_VALUE,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(fetchGenresList(''));
    dispatch(fetchStudiosList(''));
  }, []);

  const combineGenreList = genresList.concat(genres);
  const combineStudioList = studiosList.concat(studios);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={styles['anime-edit__form']}>
          <AnimeFormSimpleInputs/>
          <FormItemWrapper name="genres">
            <AppSelectWithSearch
              onSearchChange={value => dispatch(fetchGenresList(value))}
              isCreateLoading={isCreateGenreLoading}
              isListLoading={isGenreListLoading}
              onClickAddNewItem={value => dispatch(createNewGenre(value))}
              defaultValue={
                data && getCurrentList<Genre>(data.genresIds, genres)
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
                data && getCurrentList<Studio>(data.studioIds, studios)
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
        <Typography>Airing:</Typography>{' '}
        <FormInputItem as={Switch} name="isAiring" />
        <FormInputItem
          propsInput={{ minRows: 8, multiline: true, maxRows: 15 }}
          name="synopsis"
          label={'Synopsis'}
        />
        <LoadingButton variant="contained" type="submit" fullWidth>
          {data != null ? 'Update' : 'Create'}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};
