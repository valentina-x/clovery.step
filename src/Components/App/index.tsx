import React from 'react';
import './style.scss';

import { PointsAwardingFields } from '../PointsAwarding/types';
import PointsAwarding from '../PointsAwarding';
import ParticipantID from '../ParticipantIDCard';
import Title from '../Title';

function App() {
  const onSubmit = (formFields: PointsAwardingFields) => {
    console.log(formFields);
  };

  return (
    <>
      <Title className='title title--mb44'>Баллы</Title>
      <div className='container'>
        <PointsAwarding onSubmit={onSubmit} />
        <ParticipantID onSubmit={onSubmit} />
      </div>
    </>
  );
}

export default App;
