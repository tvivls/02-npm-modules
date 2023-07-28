import { useEffect, useRef, useState } from 'react';

export type CallbackType = (visibility: boolean) => void;

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(document.visibilityState === 'visible');
  const [count, setCount] = useState(0);
  const callbackArray = useRef<CallbackType[]>([]);

  const onVisibilityChange = (callback: CallbackType) => {
    callbackArray.current.push(callback);
  };

  useEffect(() => {
    const handleVisibility = () => {
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
