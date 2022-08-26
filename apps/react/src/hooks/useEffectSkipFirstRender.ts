import { DependencyList, useEffect, useRef } from 'react';

export const useEffectSkipFirstRender = (
  callback: () => void,
  deps: DependencyList,
): void => {
  const isFirstMounted = useRef(0);
  useEffect(() => {
    if (isFirstMounted.current < 2) {
      isFirstMounted.current++;
      return;
    }
    callback?.();
  }, deps);
};
