import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  createButton?: ReactNode;
}

export const PageTitle = ({ title, createButton }: PageTitleProps) => {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center'>
      <h1 className='text-secondary'>{title}</h1>
      {createButton ? createButton : null}
    </div>
  );
};
