import { useState, useEffect } from 'react';

export const useMediaQuery = (options: { query: string }): boolean => {
    const { query } = options;
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const queryList = window.matchMedia(query);
        const handleMediaQuery = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };
        queryList.addEventListener('change', handleMediaQuery);
        setMatches(queryList.matches);
        return () => {
            queryList.removeEventListener('change', handleMediaQuery);
        };
    }, [query]);

    return matches;
};
