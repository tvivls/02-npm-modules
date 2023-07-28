import { ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

type ResolutionType = `${number}dppx` | number;

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

const getQueryString = (key: string, value: number | string) => {
  const formattedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  const queryString = `(${formattedKey}: ${value}`;
  if (formattedKey === 'orientation') return `${queryString})`;
  if (formattedKey.includes('resolution')) return typeof value === 'number' ? `${queryString}dppx)` : `${queryString})`;
  else return `${queryString}px)`;
};

export const buildMediaQuery = (props: Omit<QueryProps, 'children'>): string => {
  if (Object.keys(props).length === 0) throw new Error('Необходимо указать хотя бы один prop!');
  return Object.entries(props)
    .map(([key, value]) => getQueryString(key, value))
    .join(' and ');
};

const MediaQuery = ({ children, ...props }: QueryProps) => {
  const mediaQueryMatch = useMediaQuery({
    query: buildMediaQuery(props),
  });

  return (
    <>
      {typeof children === 'function'
        ? mediaQueryMatch && children(mediaQueryMatch)
        : mediaQueryMatch && <>{children}</>}
    </>
  );
};

export default MediaQuery;
