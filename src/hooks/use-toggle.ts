import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback((state?: boolean) => {
    if (typeof state === 'boolean') setState(state);
    else setState((prev) => !prev);
  }, []);
  return [state, toggle] as const;
};
