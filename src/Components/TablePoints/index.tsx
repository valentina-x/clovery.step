import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

/* components */
import Title, { TitleStyles } from '../Title/index';
import Pagination from '../Pagination';

interface Data {
  id: string;
  email: string;
  accruals: number;
  points: number;
}

export default function TablePoints() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./Table.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Data[] = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const totalRows = data.length;

  // Define the number of rows per page
  const rowsPerPage = 8;

  // Define and manage the current page using state
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page change by updating the currentPage state
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log('Current Page:', newPage);
  };

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
      <div className={`${styles.points__container}`} id='load'>
        {data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((object) => (
          <div className={`${styles.points__row}`} key={object.id}>
            <Title className={`${styles.points__item}`}>{object.email}</Title>
            <Title className={`${styles.points__item}`}>{object.accruals}</Title>
            <Title className={`${styles.points__item}`}>{object.points}</Title>
          </div>
        ))}
      </div>
      <Pagination
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
