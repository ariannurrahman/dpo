import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout() {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken auth', accessToken);

  if (accessToken) {
    return <Navigate to='/dashboard/orders' />;
  }

  return (
    <div className='auth-layout'>
      <Outlet />
    </div>
  );
}
