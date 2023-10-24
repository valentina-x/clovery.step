import React from 'react';
import styles from './style.module.scss';

export default function Pagination({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}: {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const showPageNumbers = 5; // Number of page numbers to display
  let startPage = Math.max(currentPage - Math.floor(showPageNumbers / 2), 1);
  let endPage = Math.min(startPage + showPageNumbers - 1, totalPages);

  if (endPage - startPage + 1 < showPageNumbers) {
    // Adjust the start and end pages to show exactly `showPageNumbers` if possible
    startPage = Math.max(endPage - showPageNumbers + 1, 1);
  }

  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = currentPage === totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${styles.pagination}`}>
      <div className={`${styles.pagination__wrapper}`}>
        <svg
          className={`${styles.pagination__chevron} ${styles.pagination__chevron_left} ${
            isOnFirstPage ? styles.pagination__chevron_disabled : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <use xlinkHref='#s_chevron-left'></use>
        </svg>

        {startPage > 1 && (
          <div
            className={`${styles.pagination__item}`}
            onClick={() => handlePageChange(startPage - 1)}
          >
            ...
          </div>
        )}

        {pageNumbers.map((pageNumber, index) => (
          <div
            key={index}
            className={`${styles.pagination__item} ${
              currentPage === pageNumber ? styles.pagination__item_activated : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}

        {endPage < totalPages && (
          <div
            className={`${styles.pagination__item}`}
            onClick={() => handlePageChange(endPage + 1)}
          >
            ...
          </div>
        )}

        {endPage < totalPages && (
          <div
            className={`${styles.pagination__item}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        )}

        <svg
          className={`${styles.pagination__chevron} ${styles.pagination__chevron_right} ${
            isOnLastPage ? styles.pagination__chevron_disabled : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <use xlinkHref='#s_chevron-right'></use>
        </svg>
      </div>
    </div>
  );
}
