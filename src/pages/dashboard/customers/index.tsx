import { useRef, useState } from 'react';

import { DpoTable, PageTitle, Pagination } from 'components';
import { ContentLayout } from 'layout/ContentLayout';

import customers from 'data/customers.json';
import { PAGE_SIZE } from 'constants';
import { CustomerFormModal } from './components/customers-form-modal';
import { usePagination } from 'components/pagination/usePagination';
import { useModal } from 'hooks/useModal';
import { Customers, ModalType } from 'types';
import { useCustomer } from './hooks/useCustomer';

export const CustomersManagementPage = () => {
  const modalRef = useRef(null);

  const [selectedCustomer, setSelectedCustomer] = useState<Customers | undefined>(undefined);

  const { onDeleteCustomer } = useCustomer({ data: undefined });
  const { hideModal, modalType, showModal } = useModal({ ref: modalRef });
  const { currentPage, currentPosts, paginate } = usePagination({ data: customers.data, pageSize: PAGE_SIZE });

  const onClickCustomerActions = (action: ModalType, data: Customers | undefined) => {
    setSelectedCustomer(data);
    showModal(action);
  };

  const customersData = currentPosts as Customers[];

  return (
    <ContentLayout>
      <CustomerFormModal selectedCustomer={selectedCustomer} type={modalType} ref={modalRef} hideModal={hideModal} />
      <PageTitle
        title='Customers Management'
        createButton={
          <button
            className='btn btn-outline-primary text-nowrap hover:text-white'
            onClick={() => onClickCustomerActions('Create', undefined)}
          >
            + Customer
          </button>
        }
      />
      <DpoTable
        thead={
          <thead>
            <tr>
              <th className='text-body-secondary' scope='col'>
                #
              </th>
              <th className='text-body-secondary' scope='col'>
                Name
              </th>
              <th className='text-body-secondary' scope='col'>
                Company
              </th>
              <th className='text-body-secondary' scope='col'>
                Email
              </th>
              <th className='text-body-secondary' scope='col'>
                Phone
              </th>
              <th className='text-body-secondary' scope='col'>
                Address
              </th>
              <th className='text-body-secondary' scope='col'></th>
            </tr>
          </thead>
        }
        tbody={
          <tbody className='table-group-divider-secondary'>
            {customersData.map((eachCustomer, index) => {
              const { address, company, email, id, name, phone } = eachCustomer;

              return (
                <tr key={id}>
                  <th>{(currentPage - 1) * PAGE_SIZE + index + 1}</th>
                  <td>{name}</td>
                  <td>{company}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{`${address}`}</td>
                  <td style={{ minWidth: 200 }}>
                    <div className='row row-cols-auto'>
                      <div className='col'>
                        <button
                          type='button'
                          onClick={() => onClickCustomerActions('View', eachCustomer)}
                          className='btn btn-light shadow-sm border flex justify-content-center align-items-center'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-search'
                            viewBox='0 0 16 16'
                          >
                            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
                          </svg>
                        </button>
                      </div>
                      <div className='col'>
                        <button
                          onClick={() => onClickCustomerActions('Edit', eachCustomer)}
                          type='button'
                          className='btn btn-light shadow-sm border flex justify-content-center align-items-center'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-pencil'
                            viewBox='0 0 16 16'
                          >
                            <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325' />
                          </svg>
                        </button>
                      </div>
                      <div className='col'>
                        <button
                          onClick={() => onDeleteCustomer(eachCustomer.id)}
                          type='button'
                          className='btn btn-light shadow-sm border flex justify-content-center align-items-center'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-trash3'
                            viewBox='0 0 16 16'
                          >
                            <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        }
      />
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        postPerPage={PAGE_SIZE}
        totalPosts={customers.data.length}
      />
    </ContentLayout>
  );
};
