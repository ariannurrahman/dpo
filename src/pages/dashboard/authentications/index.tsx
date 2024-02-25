import { DpoTable, PageTitle, Pagination } from 'components';
import { ContentLayout } from 'layout/ContentLayout';

import authentications from 'data/authentications.json';
import { PAGE_SIZE } from 'constants';
import { usePagination } from 'components/pagination/usePagination';
import { Authentications } from 'types';
import { useAuthentications } from './hooks/useAuthentications';

export const AuthenticationsManagementPage = () => {
  const { onForceLogout } = useAuthentications();
  const { currentPage, currentPosts, paginate } = usePagination({ data: authentications.data, pageSize: PAGE_SIZE });

  const authenticationsData = currentPosts as Authentications[];

  return (
    <ContentLayout>
      <PageTitle title='Authentications Management' />
      <DpoTable
        thead={
          <thead>
            <tr>
              <th className='text-body-secondary' scope='col'>
                #
              </th>
              <th className='text-body-secondary' scope='col'>
                Username
              </th>
              <th className='text-body-secondary' scope='col'>
                Email
              </th>
              <th className='text-body-secondary' scope='col'>
                Password
              </th>
              <th className='text-body-secondary' scope='col'>
                Role
              </th>
              <th className='text-body-secondary' scope='col'></th>
            </tr>
          </thead>
        }
        tbody={
          <tbody className='table-group-divider-secondary'>
            {authenticationsData?.map((eachAuthenticationData, index) => {
              const { username, email, password, role, id } = eachAuthenticationData;

              return (
                <tr key={`${id}_${index}`}>
                  <th>{(currentPage - 1) * PAGE_SIZE + index + 1}</th>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td>
                    <p className={`badge border ${role === 'Admin' ? 'text-primary' : 'text-secondary'}`}>{role}</p>
                  </td>
                  <td style={{ minWidth: 200 }}>
                    <div className='row row-cols-1'>
                      <div className='col'>
                        <button
                          onClick={() => onForceLogout(eachAuthenticationData?.id)}
                          type='button'
                          className='btn btn-light shadow-sm border flex justify-content-center align-items-center'
                        >
                          Force Logout
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
        totalPosts={authentications.data.length}
      />
    </ContentLayout>
  );
};
