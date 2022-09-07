import { Genre, Studio, TypeModel } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { Button } from '@mui/material';

import { Field, Form, FormikProvider, useFormik } from 'formik';
import { FC } from 'react';

import { AppSelect, FormInputItem } from '../../../../components';

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
  status: data.status,
  source: data.source,
  isAiring: data.isAiring,
  startDate: data.aired.start ? null : data.aired.start,
  endDate: data.aired.end ? null : data.aired.end,
  rating: data.rating,
  season: data.season,
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
        <FormInputItem label={'Title English'} name={'titleEnglish'} />
        <FormInputItem label={'Title Japanese'} name={'titleJapan'} />
        <FormInputItem label={'Trailer Youtube ID'} name={'trailerYoutubeId'} />
        <Field
          as ={AppSelect}
          list={Object.values(TypeModel).map(item => ({ value: item }))}
          label={'Type'}
          defaultValue={data ? data.type : null}
          name={'type'}
        />
        <FormInputItem label={'Title English'} name={'status'} />
        <FormInputItem label={'Title English'} name={'source'} />
        <FormInputItem label={'Title English'} name={'isAiring'} />
        <FormInputItem label={'Title English'} name={'startDate'} />
        <FormInputItem label={'Title English'} name={'endDate'} />
        <FormInputItem label={'Title English'} name={'rating'} />
        <FormInputItem label={'Title English'} name={'season'} />
        <FormInputItem label={'Title English'} name={'synopsis'} />
        <FormInputItem label={'Title English'} name={'studios'} />
        <FormInputItem label={'Title English'} name={'genres'} />
        <Button type="submit" >Suibmit</Button>
      </Form>
    </FormikProvider>
  );
};
