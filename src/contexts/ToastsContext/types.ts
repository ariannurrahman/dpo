import { ReactNode } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}
export interface ToastProviderProps {
  children: ReactNode;
}
