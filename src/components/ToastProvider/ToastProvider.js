import React from 'react';

import useKeydown from '../../hooks/use-keyDown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      variant: "error",
      message: "oh no!"
    }
  ]);

  function createToast(message, variant) {
    const nextToasts = [...toasts,
    {
      id: crypto.randomUUID(),
      variant,
      message
    }
    ]
    setToasts(nextToasts);
  };

  function dismissToast(id) {
      const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  };
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape',handleEscape);

  return (
  <ToastContext.Provider value={{ toasts, createToast, dismissToast }} >
    {children}</ToastContext.Provider>
  );
}

export default ToastProvider;
