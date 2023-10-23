import React from 'react';
import AppStyles from './style.module.scss';

import { PointsAwardingFields } from '../PointsAwarding/types';
import SearchHistoryFields from '../SearchHistory/types';
import PointsAwarding from '../PointsAwarding';
import TablePoints from '../TablePoints';
import SearchHistory from '../SearchHistory';

function App() {
  const onSubmitPointsAwarding = (formFields: PointsAwardingFields) => {
    console.log(formFields);
  };
  const onSubmitSearchHistory = (formFields: SearchHistoryFields) => {
    console.log(formFields);
  };

  return (
    <div className={AppStyles.App}>
      <div className={AppStyles.container}>
        <PointsAwarding onSubmit={onSubmitPointsAwarding} />
        <TablePoints />
        <SearchHistory onSubmit={onSubmitSearchHistory} />
      </div>
    </div>
  );
}

export default App;
