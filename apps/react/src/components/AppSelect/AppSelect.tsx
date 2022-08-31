import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import { FC, useState } from 'react';

/** Select item. */
export interface SelectItem {

  /** Value of select item. */
  readonly value: string | number;

  /** Displaying text of select item. */
  readonly text?: string | number;
}

interface Props extends SelectProps {

  /** List of items. */
  readonly list: readonly SelectItem[];

  /** Side effect when sorting value change. */
  readonly onChangeSideEffect?: (value: string) => void;
}

export const AppSelect: FC<Props> = ({
  list,
  onChangeSideEffect,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    props.defaultValue as string ?? '',
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setSelectedValue(value);
    onChangeSideEffect?.(value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id={`select-${props.id}`}>{props.label}</InputLabel>
      <Select
        {...props}
        value={selectedValue}
        labelId={`select-${props.id}`}
        sx={{ width: '100%' }}
        onChange={handleChange}
      >
        {list.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.text ?? item.value}
          </MenuItem>
        ))}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
