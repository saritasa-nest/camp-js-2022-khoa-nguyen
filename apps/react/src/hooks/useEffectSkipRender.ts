import { DependencyList, useEffect, useRef } from 'react';

/**
 * This hook is used for skip the amount of renders of the useEffect hook.
 * Usually, we only need to skip 1 render but sometime, due to other factors,
 * we might need to skip two or more renders. .
 */

export const useEffectSkipRender = (
  renderToBeSkipped: number,
  callback: () => void,
  deps: DependencyList,
): void => {
  const mountedTimes = useRef(0);
  useEffect(() => {
    if (mountedTimes.current < renderToBeSkipped) {
      mountedTimes.current++;
      return;
    }
    callback();
  }, deps);
};
