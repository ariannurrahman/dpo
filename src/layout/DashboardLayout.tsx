import { Navbar } from 'components';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function DashboardLayout() {
  const location = useLocation();

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <div />
        <Outlet />
      </div>
    </div>
  );
}
