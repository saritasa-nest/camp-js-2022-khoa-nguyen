import { FormikProps } from 'formik';
import { FC } from 'react';

import { AppDatePicker, FormItemWrapper } from '../../../../../components';
import { AnimeFormValidation } from '../formSetting';

/**
 * Get default date for app date picker.
 * @param date Date input.
 */
function getDefaultDate(date: AnimeFormValidation['startDate']): Date | null {
  return date !== '' ? date : null;
}

interface Props {

  /** Formik. */
  readonly formik: FormikProps<AnimeFormValidation>;
}

export const AnimeFormDateInputs: FC<Props> = ({ formik }) => (
  <>
    <FormItemWrapper name="startDate">
      <AppDatePicker
        label={'Start date'}
        defaultValue={getDefaultDate(formik.initialValues.startDate)}
        onDateChange={(newDate: Date | null) => {
          formik.setFieldValue('startDate', newDate);
        }}
      />
    </FormItemWrapper>
    <FormItemWrapper name="endDate">
      <AppDatePicker
        label={'End date'}
        defaultValue={getDefaultDate(formik.initialValues.endDate)}
        onDateChange={(newDate: Date | null) => {
          formik.setFieldValue('endDate', newDate);
        }}
      />
    </FormItemWrapper>
  </>
);
