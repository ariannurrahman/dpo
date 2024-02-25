import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';

import { OrdersManagementPage } from 'pages/dashboard/orders';
import { CustomersManagementPage } from 'pages/dashboard/customers';
import { AuthenticationsManagementPage } from 'pages/dashboard/authentications';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='customers' element={<CustomersManagementPage />} />
          <Route path='orders' element={<OrdersManagementPage />} />
          <Route path='authentications' element={<AuthenticationsManagementPage />} />

          <Route path='' element={<Navigate to='/dashboard/customers' />} />
          <Route path='*' element={<Navigate to='/dashboard/customers' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
