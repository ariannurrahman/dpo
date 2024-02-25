import { createContext, useContext, useState } from 'react';
import { ToastContextType, ToastProviderProps, ToastType, Toast } from './types';

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  console.log('toasts', toasts);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    setToasts([...toasts, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
};
