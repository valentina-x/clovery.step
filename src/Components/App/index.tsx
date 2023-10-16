import React from 'react';
import './style.scss';

import Title from '../Title';
import { PointsAwardingFields } from '../PointsAwarding/types';
import PointsAwarding from '../PointsAwarding';
import ParticipantPoints from '../ParticipantPoints';
import ParticipantID from '../ParticipantIDCard';

function App() {
  const onSubmit = (formFields: PointsAwardingFields) => {
    console.log(formFields);
  };

  return (
    <>
      <Title className='title title--mb44'>Баллы</Title>
      <div className='container'>
        <PointsAwarding onSubmit={onSubmit} />
        <ParticipantPoints />
        <ParticipantID onSubmit={onSubmit} />
      </div>
    </>
  );
}

export default App;
