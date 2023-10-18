import React from 'react';

import './style.scss';
// import AppStyles from './style.module.scss';

import Title from '../Title';
import { PointsAwardingFields } from '../PointsAwarding/types';
import { SearchHistoryFields } from '../SearchHistory/types';
import PointsAwarding from '../PointsAwarding';
import TablePoints from '../TablePoints';
import SearchHistory from '../SearchHistory';

function App() {
  const onSubmit1 = (formFields: PointsAwardingFields) => {
    console.log(formFields);
  };
  const onSubmit2 = (formFields: SearchHistoryFields) => {
    console.log(formFields);
  };

  return (
    <>
      <Title className='title title--mb44'>Баллы</Title>
      {/* <div className={AppStyles.container}> */}
      <div className='container'>
        <PointsAwarding onSubmit={onSubmit1} />
        <TablePoints />
        <SearchHistory onSubmit={onSubmit2} />
      </div>
    </>
  );
}

export default App;
