import { Link, useLocation } from 'react-router-dom';

import { useLayout } from 'contexts/LayoutContext/LayoutContext';
import { NAVIGATION } from 'constants';

import { useDetectScreen } from 'hooks/useDetectScreen';
import { useLoginForm } from 'pages/auth/login/useLoginForm';

import './style.scss';

export const Sidebar = () => {
  const { isSidebarOpen, onClickSidebar } = useLayout();
  const { onLogout } = useLoginForm();
  const { isMobile } = useDetectScreen();
  const location = useLocation();

  return (
    <div
      className={`ps-0 ps-md-5 pt-2 pt-md-4 sidebar bg-light border-end shadow-md ${
        !isSidebarOpen ? 'end-100' : 'start-0'
      }`}
    >
      <nav className='nav flex flex-column'>
        {NAVIGATION.map(({ label, to }) => {
          return (
            <Link
              key={label}
              to={to}
              onClick={isMobile ? onClickSidebar : undefined}
              className={`nav-link mb-3 ${
                to === location.pathname
                  ? 'fw-bold text-decoration-underline text-info'
                  : 'fw-medium text-decoration-none text-info-emphasis'
              }`}
            >
              {label}
            </Link>
          );
        })}
        <div className='px-3'>
          {isMobile ? (
            <button onClick={onLogout} className='btn btn-outline-info d-block d-md-none'>
              Sign Out
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
};
