import React from 'react';
import styles from './style.module.scss';

export default function Pagination() {
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
}
