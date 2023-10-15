import React from 'react';
import './style.scss';

import { PointsAwardingFields } from '../PointsAwarding/types';
import PointsAwarding from '../PointsAwarding';
import ParticipantID from '../ParticipantIDCard';

function App() {
  const onSubmit = (formFields: PointsAwardingFields) => {
    console.log(formFields);
  };

  return (
    <>
      <PointsAwarding onSubmit={onSubmit} />
      <ParticipantID onSubmit={onSubmit} />
    </>
  );
}

export default App;
