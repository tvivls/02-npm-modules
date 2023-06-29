import {useEffect, useState} from 'react';

export const useDocumentVisibility = () => {
    const [visible, setVisible] = useState(true);
    const [count, setCount] = useState(0);
    const handleVisibility = (): void => {
        if (document.visibilityState === 'hidden') {
            setCount(prevState => prevState + 1);
            setVisible(false);
        } else {
            setVisible(true);
        }
    };
    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);
    return {
        count,
        visible,
        onVisibilityChange: (callback: EventListener) => {
            document.addEventListener('visibilitychange', callback);
            return () => {
                document.removeEventListener('visibilitychange', callback);
            };
        },
    };
};
