import { Link } from 'react-router-dom';

import { useLayout } from 'contexts/LayoutContext/LayoutContext';
import { useLoginForm } from 'pages/auth/login/useLoginForm';

import DpoLogo from 'assets/logo.svg';

export const Navbar = () => {
  const { onClickSidebar } = useLayout();
  const { onLogout } = useLoginForm();

  return (
    <nav className='px-0 px-md-5 navbar navbar-expand-md navbar-light bg-light border-bottom shadow-md'>
      <div className='container-fluid'>
        <Link to='/dashboard/customers'>
          <img src={DpoLogo} alt='DPO' />
        </Link>
        <div className='d-flex d-md-none'>
          <button
            onClick={onClickSidebar}
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <div className='me-auto' />
          <button className='btn btn-outline-info d-none d-md-block' onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};
