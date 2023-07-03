import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';

export type QueryProps = {
  orientation?: string;
  minResolution?: string | number;
  maxResolution?: string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: ReactNode | ((matches: boolean) => ReactNode);
};

const MediaQuery: FC<QueryProps> = ({ children, ...props }) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const query = buildQuery();
    const queryList = window.matchMedia(query);
    const handleMediaQuery = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    queryList.addEventListener('change', handleMediaQuery);
    setMatches(queryList.matches);
    return () => {
      queryList.removeEventListener('change', handleMediaQuery);
    };
  }, []);

  const buildQuery = (): string => {
    const mediaQuery: string[] = Object.entries(props).map(([key, value]) => {
      const formattedKey: string = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const queryString = `(${formattedKey}: ${value}`;
      if (formattedKey === 'orientation') return `${queryString})`;
      if (formattedKey.includes('resolution'))
        return typeof value === 'number' ? `${queryString}dppx)` : `${queryString})`;
      else return `${queryString}px)`;
    });
    return mediaQuery.join(' and ');
  };
  return (
    <>
      {typeof children === 'function'
        ? (children as (matches: boolean) => React.ReactNode)(matches)
        : matches && <>{children}</>}
    </>
  );
};

export default MediaQuery;
