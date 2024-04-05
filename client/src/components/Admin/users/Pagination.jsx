import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-end gap-2'>
        <nav className="pagination">
          {pageNumbers.map((number) => (
            <p key={number} onClick={() => paginate(number)} className="page-link">
              {number}
            </p>
          ))}
        </nav>
    </div>

  );
};

export default Pagination;
