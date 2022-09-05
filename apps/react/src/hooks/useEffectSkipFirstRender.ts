import { DependencyList, useEffect, useRef } from 'react';

/** This hook is used for skip first rendering of the useEffect hook.
 *  Sometime, due to the strick mode or other factors, we need to skip two or more renders. */

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
