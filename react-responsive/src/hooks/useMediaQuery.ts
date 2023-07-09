import { useState, useEffect, useRef } from 'react';

export type QueryType = {
  query: string;
};

export const useMediaQuery = ({ query }: QueryType, isSSR = false) => {
  const [matches, setMatches] = useState(isSSR ? false : undefined);
  const queryList = useRef<MediaQueryList>();
  useEffect(() => {
    if ('matchMedia' in window) {
      queryList.current = window.matchMedia(query);
      const handleMediaQuery = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      queryList.current.addEventListener('change', handleMediaQuery);
      setMatches(queryList.current.matches);
      return () => {
        queryList.current?.removeEventListener('change', handleMediaQuery);
      };
    }

    return undefined;
  }, [query]);

  return matches;
};
