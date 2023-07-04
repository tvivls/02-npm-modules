import { useEffect, useRef, useState } from 'react';

export type CallbackType = (visibility: boolean) => void;

export const useDocumentVisibility = () => {
  const documentVisibility = (): boolean => document.visibilityState === 'visible';
  const [visible, setVisible] = useState<boolean>(documentVisibility);
  const [count, setCount] = useState(0);
  const callbackArray = useRef<CallbackType[]>([]);

  const onVisibilityChange = (callback: CallbackType): void => {
    callbackArray.current.push(callback);
  };

  useEffect(() => {
    const handleVisibility = (): void => {
      callbackArray.current.forEach((currentCallback) => currentCallback(documentVisibility()));
      if (documentVisibility()) {
        setVisible(true);
      } else {
        setCount((prevState) => prevState + 1);
        setVisible(false);
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
