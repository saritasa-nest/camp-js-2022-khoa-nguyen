import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_TIME = 300;

export const useSearch = (initialValue: string) => {
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
