import styles from './style.module.scss';
import React, { useState } from 'react';

/* components */
import Title, { TitleStyles } from '../Title/index';
import Pagination from '../Pagination';

export default function TablePoints() {
  // запрос
  // получаем массив

  const arrData = [
    {
      id: '6322940232029',
      начисления: 10,
      'Кол-во баллов': 100,
    },
    {
      id: '7409818955855',
      начисления: 7,
      'Кол-во баллов': 166,
    },
    {
      id: '4880412893353',
      начисления: 16,
      'Кол-во баллов': 175,
    },
    {
      id: '2104732188190',
      начисления: 17,
      'Кол-во баллов': 54,
    },
    {
      id: '1879728677059',
      начисления: 14,
      'Кол-во баллов': 130,
    },
    {
      id: '2649958917284',
      начисления: 5,
      'Кол-во баллов': 54,
    },
    {
      id: '1170298238313',
      начисления: 7,
      'Кол-во баллов': 144,
    },
    {
      id: '2909191937984',
      начисления: 1,
      'Кол-во баллов': 170,
    },
    {
      id: '6949070343035',
      начисления: 9,
      'Кол-во баллов': 123,
    },
    {
      id: '7315863408755',
      начисления: 20,
      'Кол-во баллов': 123,
    },
    {
      id: '8355112492173',
      начисления: 3,
      'Кол-во баллов': 83,
    },
    {
      id: '4591512402881',
      начисления: 10,
      'Кол-во баллов': 144,
    },
    {
      id: '5320229479408',
      начисления: 1,
      'Кол-во баллов': 140,
    },
    {
      id: '5349465591534',
      начисления: 5,
      'Кол-во баллов': 96,
    },
    {
      id: '6327247803662',
      начисления: 14,
      'Кол-во баллов': 128,
    },
    {
      id: '6401614411450',
      начисления: 5,
      'Кол-во баллов': 5,
    },
    {
      id: '3447802710974',
      начисления: 8,
      'Кол-во баллов': 30,
    },
    {
      id: '9924956643527',
      начисления: 5,
      'Кол-во баллов': 195,
    },
    {
      id: '3043570690615',
      начисления: 1,
      'Кол-во баллов': 144,
    },
    {
      id: '8813797823910',
      начисления: 2,
      'Кол-во баллов': 95,
    },
  ];

  const totalRows = arrData.length;

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
        {arrData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((object) => (
          <div className={`${styles.points__row}`} key={object.id}>
            <Title className={`${styles.points__item}`}>{object.id}</Title>
            <Title className={`${styles.points__item}`}>{object.начисления}</Title>
            <Title className={`${styles.points__item}`}>{object['Кол-во баллов']}</Title>
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
/* const container = document.querySelector(`.${styles.points__container}`); */

/* if (container) {
    container.innerHTML = ''; // Clear the container
    arrData.forEach((object) => {
      // Create a new template for each object
      const template = `
      <div className=${styles.pointsrow}>
        <Title className=${styles.pointsitem}>${object.id}</Title>
        <Title className=${styles.pointsitem}>${object['Кол-во баллов']}</Title>
        <Title className=${styles.pointsitem}>${object.начисления}</Title>
      </div>
    `;

      container.insertAdjacentHTML('beforeend', template);
    });
  }
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
   /*      </div> */
/* </div>
      <Pagination />
    </div>
  );
} */
