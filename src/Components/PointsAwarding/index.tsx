import React from 'react';
import './style.scss';

/* components */
import Button from '../Button/index';
import Title from '../Title/index';
import Textarea from '../Textarea/index';

/* types data form */
import { PointsAwardingFields } from '../PointsAwarding/types';

interface IPointsAwardingProps {
  onSubmit: (data: PointsAwardingFields) => void;
}

// type FormFields = {
// 	id: HTMLInputElement,
// 	activity: HTMLInputElement,

// }

export default function PointsAwarding({ onSubmit }: IPointsAwardingProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
  };

  return (
    <form className='pointsawardingdorm' onSubmit={handleSubmit}>
      <Title className='title title--size20 title--mb28'>
        Начисление баллов
      </Title>

      <label className='margin margin--mb12'>
        <Title className='title title--size14 title--mb8'>Кому</Title>
        <Textarea
          className='input input--textarea'
          name='id'
          placeholder='Введите id пользователя'
          required
        />
      </label>

      <label className='margin margin--mb12'>
        <Title className='title title--size14 title--mb8'>
          Активность / конкурс
        </Title>
      </label>

      <label className='margin margin--mb12'>
        <Title className='title title--size14 title--mb8'>
          Причина начисления
        </Title>
      </label>

      <Button className='button button--purple button--alignment' type='submit'>
        Начислить
      </Button>
    </form>
  );
}
