import React, { FC, ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export type QueryProps = {
  orientation?: string;
  minResolution?: `${number}dppx` | number;
  maxResolution?: `${number}dppx` | number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: ReactNode | ((matches: boolean) => ReactNode);
};

const MediaQuery: FC<QueryProps> = ({ children, ...props }) => {
  const mediaQuery: string[] = Object.entries(props).map(([key, value]) => {
    const formattedKey: string = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    const queryString = `(${formattedKey}: ${value}`;
    if (formattedKey === 'orientation') return `${queryString})`;
    if (formattedKey.includes('resolution'))
      return typeof value === 'number' ? `${queryString}dppx)` : `${queryString})`;
    else return `${queryString}px)`;
  });

  const query = useMediaQuery({ query: mediaQuery.join(' and ') });

  return <>{typeof children === 'function' ? children(query) : query && <>{children}</>}</>;
};

export default MediaQuery;
