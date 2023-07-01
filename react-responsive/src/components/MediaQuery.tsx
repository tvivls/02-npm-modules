import React, { FC, useEffect, useState } from 'react';

export type QueryProps = { orientation?: string;
    minResolution?: string;
    maxResolution?: string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    children?: React.ReactNode;
}

const MediaQuery: FC<QueryProps> = ({children, ...props}) => {
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
                if (key === 'minResolution') {
                    const resolutionRegex: RegExp = /^\d+dppx$/;
                    if (resolutionRegex.test(value.toString())) {
                        mediaQuery.push(`(min-resolution: ${value})`);
                    }
                } else {
                    const splitString: string[] = /(?=[A-Z])/g[Symbol.split](key);
                    const formattedKey: string = splitString.join('-').toLowerCase();
                    mediaQuery.push(`(${formattedKey}: ${value}px)`);
                }
            }
        });
        return mediaQuery.join(' and ');
    };

    return <div>
        {matches && children}
    </div>;
};

export default MediaQuery;
