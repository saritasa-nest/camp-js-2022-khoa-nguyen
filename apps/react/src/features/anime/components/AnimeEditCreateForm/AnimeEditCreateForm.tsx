import { AnimeDetail } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { useFormik } from 'formik';
import { FC } from 'react';

import { INITIAL_VALUE, validationSchema } from './formSetting';

interface Props {

  /** Anime info. */
  readonly data?: AnimeEdit;
}

export const AnimeEditCreateForm: FC<Props> = ({ data }) => {
  const formik = useFormik({
    validationSchema,
    initialValues: data ?? INITIAL_VALUE,
  });
  return <Form>AnimeEditCreateForm</Form>;
};
