import { useRef, useState } from 'react';

import orders from 'data/orders.json';
import { PageTitle, Pagination } from 'components';
import { ContentLayout } from 'layout/ContentLayout';
import { OrdersFormModal } from './components/orders-form-modal';
import { useModal } from 'hooks/useModal';
import { ModalType, Orders } from 'types';
import { usePagination } from 'components/pagination/usePagination';
import { CARD_PAGE_SIZE } from 'constants';
import { OrderCard } from './components/order-card';

export const OrdersManagementPage = () => {
  const modalRef = useRef(null);

  const [selectedOrder, setSelectedOrder] = useState<Orders | undefined>(undefined);
  const { currentPage, currentPosts, paginate } = usePagination({ data: orders.data, pageSize: CARD_PAGE_SIZE });
  const { hideModal, modalType, showModal } = useModal({ ref: modalRef });

  const onClickOrderAction = (action: ModalType, data: Orders | undefined) => {
    setSelectedOrder(data);
    showModal(action);
  };

  const ordersData = currentPosts as Orders[];

  return (
    <ContentLayout>
      <PageTitle
        title='Orders Management'
        createButton={
          <button
            className='btn btn-outline-primary text-nowrap hover:text-white'
            onClick={() => onClickOrderAction('Create', undefined)}
          >
            + Order
          </button>
        }
      />
      <OrdersFormModal selectedOrder={selectedOrder} type={modalType} ref={modalRef} hideModal={hideModal} />
      <div className='container px-4 mt-3 mb-5'>
        <div className='row gx-5 gy-3'>
          {ordersData.map(({ customer, items, id }) => {
            return (
              <OrderCard
                key={id}
                id={id ?? 0}
                customer={customer}
                items={items}
                onClickOrderAction={onClickOrderAction}
              />
            );
          })}
        </div>
      </div>
      <div className='container'>
        <div className='row gx-5 gy-5'></div>
      </div>

      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        postPerPage={CARD_PAGE_SIZE}
        totalPosts={orders.data.length}
      />
    </ContentLayout>
  );
};
