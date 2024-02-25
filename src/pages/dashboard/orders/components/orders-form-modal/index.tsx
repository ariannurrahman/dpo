import { forwardRef, useMemo } from 'react';

import { ModalType, Orders } from 'types';
import { useOrders } from '../../hooks/useOrders';
import { ORDER_FORM } from '../../constants';

interface OrdersFormModalProps {
  type: ModalType;
  hideModal: () => void;
  selectedOrder: Orders | undefined;
}

export const OrdersFormModal = forwardRef<HTMLInputElement, OrdersFormModalProps>((props, ref) => {
  const { type, hideModal, selectedOrder } = props;
  const { errors, register, onCreateOrder, onUpdateOrder } = useOrders({
    data: selectedOrder,
  });

  const isViewOnly = useMemo(() => {
    return type === 'View';
  }, [type]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (type === 'Create') {
        await onCreateOrder();
      }
      if (type === 'Edit') {
        await onUpdateOrder();
      }
    } catch (e) {
      hideModal();
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
              {type} Orders
            </h1>
            <button type='button' className='btn-close' onClick={hideModal} aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => onSubmitForm(e)}>
              {ORDER_FORM.map((props) => {
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
OrdersFormModal.displayName = 'OrdersFormModal';
