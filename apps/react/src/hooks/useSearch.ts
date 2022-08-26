import { useEffect, useState } from 'react';

export const useSearch = () => {
  const [inputValue, setInputValue] = useState<string>('');
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
