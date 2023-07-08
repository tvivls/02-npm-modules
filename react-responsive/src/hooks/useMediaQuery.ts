import { useState, useEffect } from 'react';

export type QueryType = {
  query: string;
};

export const useMediaQuery = ({ query }: QueryType, isSSR = false) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (!isSSR) {
      const queryList = window.matchMedia(query);
      const handleMediaQuery = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      queryList.addEventListener('change', handleMediaQuery);
      setMatches(queryList.matches);
      return () => {
        queryList.removeEventListener('change', handleMediaQuery);
      };
    } else throw new Error('Медиа-запрос не может быть вполнен');
  }, [query]);

  return matches;
};
