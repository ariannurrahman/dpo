import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
