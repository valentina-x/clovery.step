import React from 'react';
import './style.scss';

/* components */

import Title from '../Title/index';
import Pagination from '../Pagination';

export default function ParticipantPoints() {
  return (
    <div className='points margin--mr32'>
      <Title className='title title--size20 title--mb28'>Баллы участников</Title>
      <div className='points__header'>
        <Title className='points__item title title--size16r title--gray'>ID участника</Title>
        <Title className='points__item title title--size16r title--gray'>Начисления</Title>
        <Title className='points__item title title--size16r title--gray'>Баллы</Title>
      </div>
      <div className='points__container' id='load'>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
        <div className='points__row'>
          <Title className='points__item title title--size16r'>2378680444322</Title>
          <Title className='points__item title title--size16r'>5 </Title>
          <Title className='points__item title title--size16r'>80</Title>
        </div>
      </div>
      <Pagination />
    </div>
  );
}
