import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface Layout {
  isSidebarOpen: boolean;
}

export interface LayoutContextType {
  onClickSidebar: () => void;
  isSidebarOpen: boolean;
}
