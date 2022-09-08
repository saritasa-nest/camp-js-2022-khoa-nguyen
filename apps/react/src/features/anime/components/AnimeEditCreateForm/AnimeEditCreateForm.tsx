/* eslint-disable max-lines-per-function */
import { Genre, StatusModel, Studio, TypeModel } from '@js-camp/core/models';
import {
  AnimeEdit,
  Rating,
  Season,
  Source,
} from '@js-camp/core/models/animeEdit';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import {
  createNewGenre,
  fetchGenres,
} from '@js-camp/react/store/genreList/dispatchers';
import {
  selectIsCreateGenreLoading,
  selectIsGenresListLoading,
  selectListGenres,
} from '@js-camp/react/store/genreList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import {
  createNewStudio,
  fetchStudiosList,
} from '@js-camp/react/store/studiosList/dispatchers';
import {
  selectIsCreateStudioLoading,
  selectIsStudiosListLoading,
  selectListStudios,
} from '@js-camp/react/store/studiosList/selectors';
import { Switch, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';

import {
  AppDatePicker,
  AppSelect,
  AppSelectWithSearch,
  FormInputItem,
  FormItemWrapper,
} from '../../../../components';

import styles from './AnimeEditCreateForm.module.css';
import {
  AnimeForm,
  INITIAL_CREATE_VALUE,
  validationSchema,
} from './formSetting';

interface Props {

  /** Anime info. */
  readonly data?: AnimeEdit;
}

const getInitialValue = (
  data: AnimeEdit,
  genres: Genre[],
  studios: Studio[],
): AnimeForm => ({
  image: data.image,
  trailerYoutubeId: data.trailerYoutubeId ?? '',
  titleEnglish: data.titleEnglish,
  titleJapan: data.titleJapan,
  type: data.type,
  status: data.status ?? '',
  source: data.source ?? '',
  isAiring: data.isAiring,
  startDate: data.aired.start ? data.aired.start : null,
  endDate: data.aired.end ? data.aired.end : null,
  rating: data.rating ?? '',
  season: data.season ?? '',
  synopsis: data.synopsis,
  studios:
    (data?.studioIds.map(item =>
      studios.find(studio => studio.id === item)) as Studio[]) ?? [],
  genres:
    (data?.genresIds.map(item =>
      genres.find(genre => genre.id === item)) as Genre[]) ?? [],
});

export const AnimeEditCreateForm: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const isCreateGenreLoading = useAppSelector(selectIsCreateGenreLoading);
  const isGenreListLoading = useAppSelector(selectIsGenresListLoading);
  const genres = useAppSelector(selectGenres);
  const genresList = useAppSelector(selectListGenres);

  const isCreateStudioLoading = useAppSelector(selectIsCreateStudioLoading);
  const studios = useAppSelector(selectStudios);
  const isStudiosListLoading = useAppSelector(selectIsStudiosListLoading);
  const studiosList = useAppSelector(selectListStudios);

  const handleSubmit = (value: AnimeForm) => {
    console.warn(value);
  };

  const formik = useFormik({
    validationSchema,
    initialValues: data ?
      getInitialValue(data, genres, studios) :
      INITIAL_CREATE_VALUE,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(fetchGenres(''));
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={styles['anime-edit__form']}>
          <FormInputItem label={'Title English'} name={'titleEnglish'} />
          <FormInputItem label={'Title Japanese'} name={'titleJapan'} />
          <FormInputItem
            label={'Trailer Youtube ID'}
            name={'trailerYoutubeId'}
          />
          <FormInputItem
            as={AppSelect}
            name="type"
            list={Object.values(TypeModel).map(item => ({ value: item }))}
            label={'Type'}
          />
          <FormInputItem
            as={AppSelect}
            name="status"
            list={Object.values(StatusModel).map(item => ({ value: item }))}
            label={'Status'}
          />
          <FormInputItem
            as={AppSelect}
            name="source"
            list={Object.values(Source).map(item => ({ value: item }))}
            label={'Source'}
          />

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
          <FormInputItem
            as={AppSelect}
            name="rating"
            list={Object.values(Rating).map(item => ({ value: item }))}
            label={'Rating'}
          />
          <FormInputItem
            as={AppSelect}
            name="season"
            list={Object.values(Season).map(item => ({ value: item }))}
            label={'Season'}
          />
          <FormItemWrapper name="genres">
            <AppSelectWithSearch
              onSearchChange={value => dispatch(fetchGenres(value))}
              isCreateLoading={isCreateGenreLoading}
              isListLoading={isGenreListLoading}
              onClickAddNewItem={value => {
                dispatch(createNewGenre(value));
                dispatch(fetchGenres(value));
              }}
              defaultValue={data?.genresIds.map(
                item => genres.find(genre => genre.id === item)?.name,
              )}
              searchPlaceholder="Search genres. e.g: Action"
              list={genresList.map(item => ({ value: item.name }))}
              label={'Genres'}
              id={'genres'}
              onValueChange={value =>
                formik.setFieldValue('genres', [...value])
              }
            />
          </FormItemWrapper>

          <FormItemWrapper name="studios">
            <AppSelectWithSearch
              onSearchChange={value => dispatch(fetchStudiosList(value))}
              isCreateLoading={isCreateStudioLoading}
              isListLoading={isStudiosListLoading}
              onClickAddNewItem={value => {
                dispatch(createNewStudio(value));
                dispatch(fetchStudiosList(value));
              }}
              defaultValue={data?.studioIds.map(
                item => studios.find(studio => studio.id === item)?.name,
              )}
              searchPlaceholder="Search studio. e.g: OLM"
              list={studiosList.map(item => ({ value: item.name }))}
              label={'Studios'}
              id={'studios'}
              onValueChange={value =>
                formik.setFieldValue('studios', [...value])
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
        <LoadingButton variant='contained' type="submit" fullWidth>
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};
