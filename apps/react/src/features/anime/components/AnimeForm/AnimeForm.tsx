import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { postAnimePoster } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { LoadingButton } from '@mui/lab';
import { Switch, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useState } from 'react';

import {
  AppSelectImage,
  FormInputItem,
  FormItemWrapper,
} from '../../../../components';

import styles from './AnimeForm.module.css';
import { AnimeFormDateInputs } from './AnimeFormDateInputs';
import { AnimeFormSelects } from './AnimeFormSelects';
import { AnimeFormSimpleInputs } from './AnimeFormSimpleInputs/AnimeFormSimpleInputs';
import {
  AnimeFormValidation,
  getInitialValue,
  INITIAL_CREATE_VALUE,
  validationSchema,
} from './formSetting';
import { useAnimeFormSelectors } from './hooks';
import { AnimeFormMapper } from './mapper';

interface Props {

  /** Anime info. */
  readonly animeInfo?: AnimeEdit;

  /** Whether form is loading or not. */
  readonly isLoading: boolean;

  /** Handle form submit. */
  readonly onFormSubmit: (value: AnimeEdit) => void;
}

export const AnimeForm: FC<Props> = ({
  animeInfo,
  isLoading,
  onFormSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [poster, setPoster] = useState<File>();
  const { genres, studios } = useAnimeFormSelectors();

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
          <AnimeFormDateInputs formik={formik} />
          <AnimeFormSelects animeInfo={animeInfo} formik={formik} />
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
