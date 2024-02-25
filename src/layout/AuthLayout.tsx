import { Navigate, Outlet } from 'react-router-dom';

import { LOCAL_STORAGE_JWT_KEY } from 'constants';

export function AuthLayout() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
  console.log('accessToken auth', accessToken);

  if (accessToken) {
    return <Navigate to='/dashboard/customers' />;
  }

  return (
    <div className='d-flex justify-content-center align-items-center container vh-100'>
      <Outlet />
    </div>
  );
}
