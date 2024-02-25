import { createContext, useContext, useEffect, useState } from 'react';
import { LayoutContextType, LayoutProps } from './types';
import { useDetectScreen } from 'hooks/useDetectScreen';

const LayoutContext = createContext<LayoutContextType>({
  onClickSidebar: () => {},
  isSidebarOpen: false,
});

export const useLayout = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useDetectScreen();

  useEffect(() => {
    const detectDevice = () => {
      if (isMobile) {
        setIsSidebarOpen(false);
      }
      if (!isMobile) {
        setIsSidebarOpen(true);
      }
    };

    detectDevice();
  }, [isMobile]);

  const onClickSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return <LayoutContext.Provider value={{ onClickSidebar, isSidebarOpen }}>{children}</LayoutContext.Provider>;
};
