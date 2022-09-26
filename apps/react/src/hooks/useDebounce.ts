import { useEffect, useState } from 'react';

const DEBOUNCE_TIME = 300;

interface UseSearchReturnedProps {

  /** Search input. */
  readonly inputValue: string;

  /** Debounce value. */
  readonly debounceValue: string;

  /** Set stage event of search input. */
  readonly setInputValue: (inputValue: string) => void;
}

/**
 * This hooks is used to implement debounce value of input.
 * @param initialValue Initial input value.
 */
export const useDebounce = (initialValue: string): UseSearchReturnedProps => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debounceValue, setDebounceValue] = useState<string>('');
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebounceValue(inputValue);
    }, DEBOUNCE_TIME);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [inputValue]);

  return { debounceValue, inputValue, setInputValue };
};
