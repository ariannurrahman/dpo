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
  const { errors, register, onCreateOrder, onUpdateOrder, fields, remove, append } = useOrders({
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

              {fields.map((_, index) => {
                return (
                  <div key={index} className='mt-3'>
                    <div className='row'>
                      <div className='col-6'>
                        <label htmlFor='itemName' className='form-label'>
                          Item Name
                        </label>
                        <input
                          className='form-control'
                          key='name'
                          {...register(`items.${index}.name`, { required: true })}
                        />
                      </div>
                      <div className='col-2'>
                        <label htmlFor='amount' className='form-label'>
                          Pcs
                        </label>
                        <input
                          className='form-control'
                          key='amount'
                          {...register(`items.${index}.amount`, { required: true })}
                        />
                      </div>
                      <div className='col-2'>
                        <label htmlFor='price' className='form-label'>
                          $
                        </label>
                        <input
                          className='form-control'
                          key='price'
                          {...register(`items.${index}.price`, { required: true })}
                        />
                      </div>
                      <div className='col-2'>
                        <label style={{ opacity: 0 }} htmlFor='itemName' className='form-label'>
                          Actions
                        </label>

                        {index === 0 ? (
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => {
                              append({ name: '', amount: 0, price: 0 });
                            }}
                          >
                            +
                          </button>
                        ) : (
                          <button type='button' className='btn btn-danger' onClick={() => remove(index)}>
                            X
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isViewOnly ? null : (
                <button type='submit' className='btn btn-primary w-100 mt-5'>
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
