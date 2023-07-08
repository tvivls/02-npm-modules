import { useState, useEffect } from 'react';

export type QueryType = {
  query: string;
};

export const useMediaQuery = ({ query }: QueryType, isSSR = false) => {
  const [matches, setMatches] = useState(false);
  if (!isSSR) {
    useEffect(() => {
      const queryList = window.matchMedia(query);
      const handleMediaQuery = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      queryList.addEventListener('change', handleMediaQuery);
      setMatches(queryList.matches);
      return () => {
        queryList.removeEventListener('change', handleMediaQuery);
      };
    }, [query]);
  }

  return matches;
};
