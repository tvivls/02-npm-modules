import { ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export type ResolutionType = `${number}dppx` | number;

export type QueryProps = {
  orientation?: string;
  minResolution?: ResolutionType;
  maxResolution?: ResolutionType;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: ReactNode | ((matches: boolean) => ReactNode);
};

const MediaQuery = ({ children, ...props }: QueryProps) => {
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
