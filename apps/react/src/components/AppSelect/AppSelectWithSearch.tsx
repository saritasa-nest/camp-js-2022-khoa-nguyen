import { Cancel } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useState } from 'react';

import { useEffectSkipRender, useSearch } from '../../hooks';

import { SelectItem } from './AppSelect';
import styles from './AppSelect.module.css';

interface Props extends SelectProps {

  /** List options. */
  readonly list: readonly SelectItem[];

  /** Label of select. */
  readonly label: string;

  /** ID of select. */
  readonly id: string;

  /** Place holder for search. */
  readonly searchPlaceholder: string;

  /** Handle search debounce value change. */
  readonly onSearchChange?: (value: string) => void;

  /** Handle create value change. */
  readonly onClickAddNewItem?: (value: string) => void;
}

export const AppSelectWithSearch: FC<Props> = ({
  list,
  label,
  id,
  searchPlaceholder,
  onSearchChange,
  onClickAddNewItem,
  ...props
}) => {
  const _defaultValue = props.defaultValue as string[];

  const [value, setValue] = useState<string[]>(_defaultValue ?? []);
  const { inputValue, setInputValue, debounceValue } = useSearch('');

  const _list =
    props.defaultValue && !debounceValue ?
      list.concat(_defaultValue.map(item => ({ value: item }))) :
      list;
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string[]);
  };
  const handleDelete = (item: string) => () => {
    setValue(prev => prev.filter(_item => _item !== item));
  };

  const handleAddNewItem = (newEntity: string) => () => {
    onClickAddNewItem?.(newEntity);
  };

  useEffectSkipRender(
    1,
    () => {
      onSearchChange?.(debounceValue);
    },
    [debounceValue],
  );

  return (
    <FormControl>
      <InputLabel id={`select-chips-${id}`}>{label}</InputLabel>
      <Select
        labelId={`select-chips-${id}`}
        multiple
        multiline
        value={value}
        label={label}
        onChange={handleChange}
        MenuProps={{ className: styles['app-select__list-wrapper'] }}
        renderValue={() => (
          <Box className={styles['app-select__chips-list']}>
            {value.map(item => (
              <Chip
                key={item}
                label={item}
                clickable
                deleteIcon={
                  <Cancel onMouseDown={event => event.stopPropagation()} />
                }
                onDelete={handleDelete(item)}
              />
            ))}
          </Box>
        )}
        {...props}
      >
        <Stack
          className={styles['app-select__search_wrapper']}
          onClickCapture={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
        >
          <TextField
            fullWidth
            role="search"
            type="search"
            placeholder={searchPlaceholder}
            value={inputValue}
            onChange={handleSearchChange}
          />
          {_list.length !== 0 &&
            debounceValue &&
            !_list
              .map(item => item.value.toLocaleLowerCase())
              .includes(debounceValue) && (
              <LoadingButton
                variant="contained"
                onClick={handleAddNewItem(debounceValue)}
              >
                Add new genre: &nbsp;<strong>{debounceValue}</strong>
              </LoadingButton>
            )}
        </Stack>
        {_list.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            <Checkbox checked={value.includes(item.value)} />
            {item.text ?? item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
