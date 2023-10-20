import React from 'react';
import styles from './style.module.scss';

export default function Pagination({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}: {
  totalRows: number; // Specify the type of totalRows
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void; // This type annotation specifies the expected function signature
}) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Function to handle changing the current page
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = currentPage === totalPages;

  // Generate an array of page numbers to render
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${styles.pagination}`}>
      <div className={`${styles.pagination__wrapper}`}>
        {/* Previous page button */}
        <svg
          className={`${styles.pagination__chevron} ${styles.pagination__chevron_left} ${
            isOnFirstPage ? styles.pagination__chevron_disabled : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <use xlinkHref='#s_chevron-left'></use>
        </svg>

        {/* Render page numbers */}
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`${styles.pagination__item} ${
              currentPage === pageNumber ? styles.pagination__item_activated : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}

        {/* Next page button */}
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

/* export default function Pagination() {
  return (
    <>
      <div className={`${styles.pagination}`}>
        <div className={`${styles.pagination__wrapper}`}>
          <svg
            className={`${styles.pagination__chevron} ${styles.pagination__chevron_left} ${styles.pagination__chevron_disabled}`}
          >
            <use xlinkHref='#s_chevron-left'></use>
          </svg>
          <div className={`${styles.pagination__item} ${styles.pagination__item_activated}`}>1</div>
          <div className={`${styles.pagination__item}`}>2</div>
          <div className={`${styles.pagination__item}`}>3</div>
          <div className={`${styles.pagination__item}`}>4</div>
          <div className={`${styles.pagination__item}`}>5</div>
          <div className={`${styles.pagination__item}`}>...</div>
          <div className={`${styles.pagination__item}`}>8</div>
          <svg className={`${styles.pagination__chevron} ${styles.pagination__chevron_right}`}>
            <use xlinkHref='#s_chevron-right'></use>
          </svg>
        </div>
      </div>
    </>
  );
} */
