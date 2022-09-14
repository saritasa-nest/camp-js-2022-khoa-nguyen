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
import { FC, useEffect, useState } from 'react';

import { useEffectSkipRender, useSearch } from '../../../hooks';
import { Loading } from '../../Loading';
import styles from '../AppSelect.module.css';
import { SelectItem } from '../AppSelectDefault';

interface Props extends SelectProps {

  /** List options. */
  readonly list: readonly SelectItem[];

  /** Label of select. */
  readonly label: string;

  /** ID of select. */
  readonly id: string;

  /** Place holder for search. */
  readonly searchPlaceholder: string;

  /** Whether create new genre is loading or not. */
  readonly isCreateLoading?: boolean;

  /** Whether list is loading or not. */
  readonly isListLoading?: boolean;

  /** Content of button create. */
  readonly buttonCreateNewText: string;

  /** Handle search debounce value change. */
  readonly onSearchChange: (value: string) => void;

  /** Handle create value. */
  readonly onClickAddNewItem: (value: string) => void;

  /** Handle value change. */
  readonly onValueChange: (value: readonly string[]) => void;
}

/**
 *
 * @param list Initial list of select items.
 * @param listCurrentValue Current values which is added by default in list.
 */
function getSelectListItem(
  list: readonly SelectItem[],
  listCurrentValue: readonly SelectItem[],
): SelectItem[] {
  return list
    .concat(listCurrentValue)
    .reduce((accumulator: SelectItem[], currentValue) => {
      if (!accumulator.map(item => item.value).includes(currentValue.value)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
}

export const AppSelectWithSearch: FC<Props> = ({
  list,
  label,
  id,
  searchPlaceholder,
  isCreateLoading,
  isListLoading,
  buttonCreateNewText,
  onSearchChange,
  onValueChange,
  onClickAddNewItem,
  ...props
}) => {
  const _defaultValue = props.defaultValue as string[];

  const [value, setValue] = useState<string[]>(_defaultValue ?? []);
  const { inputValue, setInputValue, debounceValue } = useSearch('');

  const listCurrentValue: readonly SelectItem[] = value.map(item => ({ value: item }));
  const _list =
    value && !debounceValue ? getSelectListItem(list, listCurrentValue) : list;
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setInputValue(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string[]);
    onValueChange?.(event.target.value as string[]);
  };
  const handleDelete = (item: string) => (): void => {
    setValue(prev => prev.filter(_item => _item !== item));
  };

  const handleAddNewItem = (newEntity: string) => (): void => {
    onClickAddNewItem?.(newEntity);
  };

  useEffectSkipRender(
    1,
    () => {
      onSearchChange?.(debounceValue);
    },
    [debounceValue],
  );

  useEffect(() => {
    onValueChange?.(value);
  }, [value]);

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
          {debounceValue &&
            !_list
              .map(item => item.value.toLocaleLowerCase())
              .includes(debounceValue.toLocaleLowerCase()) && (
              <LoadingButton
                loading={isCreateLoading}
                variant="contained"
                onClick={handleAddNewItem(debounceValue)}
              >
                {buttonCreateNewText} &nbsp;<strong>{debounceValue}</strong>
              </LoadingButton>
            )}
        </Stack>
        {isListLoading && <Loading isBackdropLoading={false} />}
        {!isListLoading &&
          _list.map(item => (
            <MenuItem value={item.value} key={item.value}>
              <Checkbox checked={value.includes(item.value)} />
              {item.text ?? item.value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
