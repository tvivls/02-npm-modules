import { useEffect, useRef, useState } from 'react';

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState<boolean>(document.visibilityState === 'visible');
  const [count, setCount] = useState(0);
  const callbackArray = useRef<((visibility: boolean) => void)[]>([]);

  const onVisibilityChange = (callback: (visibility: boolean) => void): void => {
    callbackArray.current.push(callback);
  };

  useEffect(() => {
    const handleVisibility = (): void => {
      callbackArray.current.forEach((currentCallback) => currentCallback(document.visibilityState === 'visible'));
      if (document.visibilityState === 'hidden') {
        setCount((prevState) => prevState + 1);
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};
