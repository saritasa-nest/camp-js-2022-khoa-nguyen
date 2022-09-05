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
  readonly value: string;

  /** Displaying text of select item. */
  readonly text?: string;
}

interface Props extends SelectProps {

  /** List of items. */
  readonly list: readonly SelectItem[];

  /** Is none selection. */
  readonly isNoneSelection?: boolean;

  /** Side effect when sorting value change. */
  readonly onChangeSideEffect?: (value: string | string[]) => void;
}

export const AppSelect: FC<Props> = ({
  isNoneSelection = false,
  list,
  onChangeSideEffect,
  ...props
}) => {
  const initialValue = (): string | string[] => {
    if (props.defaultValue != null) {
      if (props.multiple) {
        return props.defaultValue as string[];
      }
      return props.defaultValue as string;
    }
    if (props.multiple) {
      return [];
    }
    return '';
  };
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    initialValue,
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string | string[];
    onChangeSideEffect?.(value);
    if (props.multiple) {
      setSelectedValue(value);
      return;
    }
    setSelectedValue(value);
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
        {isNoneSelection && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
