import { forwardRef, useMemo } from 'react';
import { Customers, ModalType } from 'types';
import { useCustomer } from '../../hooks/useCustomer';
import { CUSTOMER_FORM } from '../../constants';

interface CustomerFormModalProps {
  type: ModalType;
  hideModal: () => void;
  selectedCustomer: Customers | undefined;
}

export const CustomerFormModal = forwardRef<HTMLInputElement, CustomerFormModalProps>((props, ref) => {
  const { type, hideModal, selectedCustomer } = props;
  const { errors, register, onCreateCustomer, onUpdateCustomer } = useCustomer({
    data: selectedCustomer,
  });

  const isViewOnly = useMemo(() => {
    return type === 'View';
  }, [type]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'Create') {
      try {
        await onCreateCustomer();
      } catch (e) {
        hideModal();
      }
    }

    if (type === 'Edit') {
      try {
        await onUpdateCustomer();
      } catch (e) {
        hideModal();
      }
    }
  };
  return (
    <div
      ref={ref}
      className='modal fade preview-modal'
      id='customers-modal'
      tabIndex={-1}
      aria-labelledby='modalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='modalLabel'>
              {type} Customer
            </h1>
            <button type='button' className='btn-close' onClick={hideModal} aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => onSubmitForm(e)}>
              {CUSTOMER_FORM.map((props) => {
                const { id, key, label, placeholder, type } = props;

                return (
                  <div className='mb-3' key={id}>
                    <label htmlFor={id} className='form-label'>
                      {label}
                    </label>
                    <input
                      readOnly={isViewOnly}
                      disabled={isViewOnly}
                      type={type}
                      className='form-control'
                      id={id}
                      placeholder={placeholder}
                      {...register(key, { required: `${label} is required` })}
                    />
                    {<p className='text-danger mt-1'>{errors[key]?.message}</p> ?? null}
                  </div>
                );
              })}

              {isViewOnly ? null : (
                <button type='submit' className='btn btn-primary w-100'>
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
CustomerFormModal.displayName = 'CustomerFormModal';
