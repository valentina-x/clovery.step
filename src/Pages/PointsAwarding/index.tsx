import React from 'react';
import ReactDOM from 'react-dom';
import '../../Assets/js/sprite';
import '../../Assets/scss/base.scss';
import { PointsAwardingFields } from '../../Components/PointsAwarding/types';
import PointsAwarding from '../../Components/PointsAwarding';

const onSubmitPointsAwarding = (formFields: PointsAwardingFields) => {
  console.log(formFields);
};

ReactDOM.render(
  <div style={{ margin: '80px 0 0 140px' }}>
    <PointsAwarding onSubmit={onSubmitPointsAwarding} />
  </div>,
  document.getElementById('root'),
);
