import { useEffect } from 'react';

import { useToast } from 'contexts/ToastsContext/ToastsContext';

const Toast = () => {
  const { removeToast, toasts } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      toasts.forEach(({ id }) => {
        removeToast(id);
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className='toast-container top-0 end-0 p-3'>
      {toasts.map(({ id, message, type }) => {
        return (
          <div key={id} className={`toast bg- ${type} show`} role='alert' aria-live='assertive' aria-atomic='true'>
            <div className='toast-header'>
              <strong className='me-auto'>DPO</strong>
              <button
                type='button'
                className='btn-close'
                onClick={() => removeToast(id)}
                data-bs-dismiss='toast'
                aria-label='Close'
              ></button>
            </div>
            <div className='toast-body'>{message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
