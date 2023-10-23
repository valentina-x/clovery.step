import React from 'react';
import ReactDOM from 'react-dom';
import '../../Assets/js/sprite';
import '../../Assets/scss/base.scss';
import SearchHistoryFields from '../../Components/SearchHistory/types';
import SearchHistory from '../../Components/SearchHistory';

const onSubmitSearchHistory = (formFields: SearchHistoryFields) => {
  console.log(formFields);
};

ReactDOM.render(
  <div style={{ margin: '80px 0 0 140px' }}>
    <SearchHistory onSubmit={onSubmitSearchHistory} />
  </div>,
  document.getElementById('root'),
);
