import { Genre, Studio } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { postAnimePoster } from '@js-camp/react/store/animeList/dispatchers';
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
import { FC, useEffect, useState } from 'react';

import {
  AppDatePicker,
  AppSelectImage,
  AppSelectWithSearch,
  FormInputItem,
  FormItemWrapper,
} from '../../../../components';

import styles from './AnimeForm.module.css';
import { AnimeFormSimpleInputs } from './AnimeFormSimpleInputs';
import {
  AnimeFormValidation,
  getInitialValue,
  INITIAL_CREATE_VALUE,
  validationSchema,
} from './formSetting';
import { useAnimeFormData } from './hooks';
import { AnimeFormMapper } from './mapper';

interface Props {

  /** Anime info. */
  readonly animeInfo?: AnimeEdit;

  /** Handle form submit. */
  readonly onFormSubmit: (value: AnimeEdit) => void;

  /** Whether form is loading or not. */
  readonly isLoading: boolean;
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

// eslint-disable-next-line max-lines-per-function
export const AnimeForm: FC<Props> = ({
  animeInfo,
  onFormSubmit,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const [poster, setPoster] = useState<File>();

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
  const [initialStudioList, setInitialStudioList] = useState<Studio[]>(studiosList);

  const handleSubmit = (value: AnimeFormValidation) => {
    if (!poster) {
      onFormSubmit(AnimeFormMapper.fromFormValue(value));
      return;
    }
    dispatch(postAnimePoster(poster)).then(result => {
      if (typeof result.payload === 'string') {
        onFormSubmit(
          AnimeFormMapper.fromFormValue({ ...value, image: result.payload }),
        );
      }
    });
  };
  const formik = useFormik({
    validationSchema,
    initialValues: animeInfo ?
      getInitialValue(animeInfo, genres, studios) :
      INITIAL_CREATE_VALUE,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(fetchGenresList('')).then(result => setInitialGenreList(result.payload as Genre[]));
    dispatch(fetchStudiosList('')).then(result => setInitialStudioList(result.payload as Studio[]));
  }, []);

  const combineGenreList = initialGenreList.concat(genres).concat(genresList);
  const combineStudioList = initialStudioList.concat(studios).concat(studiosList);

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormItemWrapper name="image">
          <AppSelectImage
            defaultImageLink={formik.initialValues.image}
            onImageChange={setPoster}
          />
        </FormItemWrapper>
        <div className={styles['anime-edit__form']}>
          <AnimeFormSimpleInputs />
          <FormItemWrapper name="startDate">
            <AppDatePicker
              label={'Start date'}
              defaultValue={
                formik.initialValues.startDate !== '' ?
                  formik.initialValues.startDate :
                  null
              }
              onFormChange={(newDate: Date | null) => {
                formik.setFieldValue('startDate', newDate);
              }}
            />
          </FormItemWrapper>
          <FormItemWrapper name="endDate">
            <AppDatePicker
              label={'End date'}
              defaultValue={
                formik.initialValues.endDate !== '' ?
                  formik.initialValues.endDate :
                  null
              }
              onFormChange={(newDate: Date | null) => {
                formik.setFieldValue('endDate', newDate);
              }}
            />
          </FormItemWrapper>
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
                animeInfo &&
                getCurrentList<Studio>(animeInfo.studioIds, studios)
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
        <Typography>Airing:</Typography>
        <FormInputItem as={Switch} name="isAiring" />
        <FormInputItem
          propsInput={{ minRows: 8, multiline: true, maxRows: 15 }}
          name="synopsis"
          label={'Synopsis'}
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          fullWidth
        >
          {animeInfo != null ? 'Update' : 'Create'}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};
