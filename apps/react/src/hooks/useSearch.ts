import { useEffect, useState } from 'react';

export const useSearch = (initialValue: string) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debounceValue, setDebounceValue] = useState<string>('');
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 300);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [inputValue]);

  return { debounceValue, inputValue, setInputValue };
};
