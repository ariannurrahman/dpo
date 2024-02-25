import { useState } from 'react';
import { Authentications, Customers, Orders } from 'types';

type DataType = Customers | Authentications | Orders;

type usePaginationProps = {
  data?: DataType[] | undefined;
  pageSize: number;
};

export const usePagination = ({ data, pageSize }: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost) ?? [];

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    currentPosts,
    paginate,
  };
};
