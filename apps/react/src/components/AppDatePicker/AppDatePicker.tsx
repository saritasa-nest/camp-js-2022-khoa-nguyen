import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FC, useState } from 'react';

interface Props {

  /** Default value. */
  readonly defaultValue: Date | null;

  /** On form change. */
  readonly onFormChange: (newDate: Date | null) => void;

  /** Label. */
  readonly label: string;
}

export const AppDatePicker: FC<Props> = ({ defaultValue, onFormChange, label }) => {
  const [value, setValue] = useState<Date | null>(defaultValue);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={newValue => {
          const newDate = newValue ? new Date(newValue) : null;
          setValue(newDate);
          onFormChange?.(newDate);
        }}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
