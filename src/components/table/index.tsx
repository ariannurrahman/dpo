import { ReactNode } from 'react';
import './style.scss';

interface DpoTableProps {
  thead: ReactNode;
  tbody: ReactNode;
}

export const DpoTable = ({ tbody, thead }: DpoTableProps) => {
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table  table-hover mb-0'>
                  {thead}
                  {tbody}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
