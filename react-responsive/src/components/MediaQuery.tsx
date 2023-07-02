import React, { FC, ReactNode, useEffect, useState } from 'react';

export type QueryProps = { orientation?: string;
    minResolution?: string | number;
    maxResolution?: string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    children?: ReactNode | ((matches: boolean) => ReactNode);
};

const MediaQuery: FC<QueryProps> = (
    {children, ...props}
) => {
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
        const mediaQuery: string[] = [];
        Object.entries(props).forEach(([key, value]) => {
            if (typeof value === 'number' || typeof value === 'string') {
                const splitString: string[] = /(?=[A-Z])/g[Symbol.split](key);
                const formattedKey: string = splitString.join('-').toLowerCase();
                const queryString: string = `(${formattedKey}: ${value}`;
                if (key.includes('orientation')) {
                    mediaQuery.push(`${queryString})`);
                } else if (key.includes('Resolution')) {
                    if (formattedKey === 'min-resolution') {
                        switch (typeof value) {
                            case 'number':
                                mediaQuery.push(`${queryString}dppx)`);
                                break;
                            case 'string':
                                mediaQuery.push(`${queryString})`);
                                break;
                        }
                    } else {
                        mediaQuery.push(`${queryString})`);
                    }
                } else {
                    mediaQuery.push(`${queryString}px)`);
                }
            }
        });
        return mediaQuery.join(' and ');
    };
    return (
        <React.Fragment>
            {typeof children === 'function'
                ? (children as (matches: boolean) => React.ReactNode)(matches)
                : (matches && <div>{children}</div>)}
        </React.Fragment>
    );
};

export default MediaQuery;
