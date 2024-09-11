import { useEffect, useRef } from 'react';

export const useRenderCount = (componentName: string = 'component') => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log(`${componentName} rendered ${count.current} times`);
  });

  useEffect(() => {
    return () => {
      console.log(`${componentName} unmounted`);
    };
  }, [componentName]);

  return count.current;
};
