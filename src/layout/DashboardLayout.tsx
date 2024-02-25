import { Navigate, Outlet } from 'react-router-dom';

import { LOCAL_STORAGE_JWT_KEY } from 'constants';
import { Navbar, Sidebar } from 'components';

import './style.scss';

export function DashboardLayout() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (!accessToken) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div className='dashboard-layout'>
      <Navbar />
      <div className='content-layout'>
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
