import './style.scss';

interface PaginationProps {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  postPerPage: number;
  totalPosts: number;
}

export const Pagination = ({ postPerPage, totalPosts, currentPage, paginate }: PaginationProps) => {
  const totalPage = Math.ceil(totalPosts / postPerPage);
  const paginationList = Array.from([...Array(totalPage).keys()].map((index: number) => (index += 1)));

  const isAbleToPrevious = currentPage === 1;
  const isAbleToNext = currentPage === paginationList.length;

  const onClickPrevious = () => {
    if (isAbleToPrevious) return;
    paginate(currentPage - 1);
  };

  const onClickNext = () => {
    if (isAbleToNext) return;
    paginate(currentPage + 1);
  };

  return (
    <div className='d-flex justify-content-end mt-3'>
      <nav aria-label='page pagination'>
        <ul className='pagination d-flex flex-row flex-wrap'>
          <li
            onClick={onClickPrevious}
            className={`page-item ${isAbleToPrevious ? 'cursor-disabled disabled' : 'cursor-pointer'}`}
          >
            <p className='page-link text-body-secondary'>&laquo;</p>
          </li>
          {paginationList.map((number) => {
            return (
              <li
                onClick={() => paginate(number)}
                className={`page-item ${currentPage === number ? 'active' : ''}`}
                key={number}
              >
                <button className='page-link text-body-secondary'>{number}</button>
              </li>
            );
          })}

          <li
            onClick={onClickNext}
            className={`page-item ${isAbleToNext ? 'cursor-disabled disabled' : 'cursor-pointer'}`}
          >
            <p className='page-link text-body-secondary'>&raquo;</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};
