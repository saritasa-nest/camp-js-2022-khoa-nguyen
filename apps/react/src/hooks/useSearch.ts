import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_TIME = 300;

interface UseSearchReturnedProps {

  /** Search input. */
  readonly inputValue: string;

  /** Debounce value. */
  readonly debounceValue: string;

  /** Set stage event of search input. */
  readonly setInputValue: (inputValue: string) => void;
}

export const useSearch = (initialValue: string): UseSearchReturnedProps => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debounceValue, setDebounceValue] = useState<string>('');
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebounceValue(inputValue);
    }, SEARCH_DEBOUNCE_TIME);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [inputValue]);

  return { debounceValue, inputValue, setInputValue };
};
