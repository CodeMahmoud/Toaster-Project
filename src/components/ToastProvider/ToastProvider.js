import React, { useEffect } from 'react';

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

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape'){
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  return (
  <ToastContext.Provider value={{ toasts, createToast, dismissToast }} >
    {children}</ToastContext.Provider>
  );
}

export default ToastProvider;
