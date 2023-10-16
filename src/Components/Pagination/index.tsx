import React from 'react';
import './style.scss';

export default function Pagination() {
  return (
    <>
      <div className='pagination'>
        <div className='pagination__wrapper'>
          <svg className='pagination__chevron pagination__chevron--left pagination__chevron_disabled'>
            <use xlinkHref='#s_chevron-left'></use>
          </svg>
          <span className='pagination__item pagination__item_activated title title--size14'>1</span>
          <span className='pagination__item title title--size14'>2</span>
          <span className='pagination__item title title--size14'>3</span>
          <span className='pagination__item title title--size14'>4</span>
          <span className='pagination__item title title--size14'>5</span>
          <span className='pagination__item title title--size14'>...</span>
          <span className='pagination__item title title--size14'>8</span>
          <svg className='pagination__chevron pagination__chevron--color pagination__chevron--right'>
            <use xlinkHref='#s_chevron-right'></use>
          </svg>
        </div>
      </div>
    </>
  );
}
