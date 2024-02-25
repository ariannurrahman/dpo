import { ToastProvider } from 'contexts/ToastsContext/ToastsContext';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from 'routes';
import DpoToasts from 'components/toast';
import { LayoutProvider } from 'contexts/LayoutContext/LayoutContext';

import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <LayoutProvider>
          <ToastProvider>
            <DpoToasts />
            <AppRoutes />
          </ToastProvider>
        </LayoutProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
