import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_TIME = 300;

export const useSearch = () => {
  const [inputValue, setInputValue] = useState<string>('');
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
