import React from 'react';
import styles from './style.module.scss';

/* components */
import Title, { TitleStyles } from '../Title/index';
import Pagination from '../Pagination';

export default function TablePoints() {
  return (
    <div className={`${styles.points}`}>
      <Title
        className={`${TitleStyles.title} ${TitleStyles.title_size20} ${TitleStyles.title_mb28}`}
      >
        Баллы участников
      </Title>
      <div className={`${styles.points__header}`}>
        <Title className={`${styles.points__item} ${styles.points__item_gray}`}>ID участника</Title>
        <Title className={`${styles.points__item} ${styles.points__item_gray}`}>Начисления</Title>
        <Title className={`${styles.points__item} ${styles.points__item_gray}`}>Баллы</Title>
      </div>
      <div className={`${styles.points__container}`}>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
        <div className={`${styles.points__row}`}>
          <Title className={`${styles.points__item}`}>2378680444322</Title>
          <Title className={`${styles.points__item}`}>5 </Title>
          <Title className={`${styles.points__item}`}>80</Title>
        </div>
      </div>
      <Pagination />
    </div>
  );
}
