import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className='px-2 px-md-5 py-2 py-md-4' style={{ width: '100%' }}>
      {children}
    </div>
  );
};
