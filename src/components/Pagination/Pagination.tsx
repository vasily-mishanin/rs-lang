import './Pagination.pcss';
import React from 'react';

interface IPagination {
  totalElements: number;
  elementsPerPage: number;
  paginate: (n: number) => void;
}
const Pagination = React.memo((props: IPagination): JSX.Element => {
  console.log('Pagination');
  const { totalElements, elementsPerPage, paginate } = props;
  const pageNumbers: number[] = Array.from(
    [...Array(totalElements / elementsPerPage).keys()],
    key => key + 1,
  );

  const pageClickHandler = (e: React.MouseEvent, pageNumber: number) => {
    e.preventDefault();
    paginate(pageNumber);
  };
  return (
    <nav>
      <ul className="pages-list">
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber}>
            <a onClick={e => pageClickHandler(e, pageNumber)} href="!#">
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});
export default Pagination;
