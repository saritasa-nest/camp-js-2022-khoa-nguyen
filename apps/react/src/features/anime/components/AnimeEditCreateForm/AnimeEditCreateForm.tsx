import { Genre, StatusModel, Studio, TypeModel } from '@js-camp/core/models';
import {
  AnimeEdit,
  Rating,
  Season,
  Source,
} from '@js-camp/core/models/animeEdit';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { Button, Switch, Typography } from '@mui/material';

import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { FC } from 'react';

import {
  AppDatePicker,
  AppSelect,
  FormInputItem,
  FormItemWrapper,
} from '../../../../components';

import {
  AnimeForm,
  INITIAL_CREATE_VALUE,
  validationSchema,
} from './formSetting';

import styles from './AnimeEditCreateForm.module.css';

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
  studios,
  genres,
});

export const AnimeEditCreateForm: FC<Props> = ({ data }) => {
  const handleSubmit = (value: AnimeForm) => {
    console.log(value);
  };

  const genres = useAppSelector(selectGenres);
  const studios = useAppSelector(selectStudios);

  const formik = useFormik({
    validationSchema,
    initialValues: data ?
      getInitialValue(data, genres, studios) :
      INITIAL_CREATE_VALUE,
    onSubmit: handleSubmit,
  });
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
        </div>
        <Typography>Airing:</Typography>{' '}
        <FormInputItem as={Switch} name="isAiring" />
        <FormInputItem
          propsInput={{ minRows: 8, multiline: true, maxRows: 15 }}
          name="synopsis"
          label={'Synopsis'}
        />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
};
