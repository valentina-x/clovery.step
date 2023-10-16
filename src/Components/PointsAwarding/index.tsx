import React from 'react';
import './style.scss';

/* components */
import Button from '../Button/index';
import Title from '../Title/index';
import Textarea from '../Textarea/index';
import CustomSelect from '../CustomSelect/index';

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
    <form className='pointsawardingform margin margin--mr32' onSubmit={handleSubmit}>
      <Title className='title title--size20 title--mb28'>Начисление баллов</Title>

      <label className='margin margin--mb32'>
        <Title className='title title--size14 title--mb8'>Кому</Title>
        <Textarea
          className='input input--textarea'
          name='id'
          placeholder='Введите id пользователя'
          required
        />
      </label>

      <label className='margin margin--mb32'>
        <Title className='title title--size14 title--mb8'>Активность / конкурс</Title>
        <CustomSelect
          nameInputMain='activity'
          showAdditionalInputs={false}
          items={[
            {
              value: 'journalism',
              name: 'activity_item',
              id: 'journalism',
              text: 'Журналистика',
              type: 'radio',
              class: 'selection__list-item_radio',
            },
            {
              value: 'design',
              name: 'activity_item',
              id: 'design',
              text: 'Дизайн',
              type: 'radio',
              class: 'selection__list-item_radio',
            },
            {
              value: 'copywriting',
              name: 'activity_item',
              id: 'copywriting',
              text: 'Копирайтинг',
              type: 'radio',
              class: 'selection__list-item_radio',
            },
          ]}
        />
      </label>

      <label className='margin'>
        <Title className='title title--size14 title--mb8'>Причина начисления</Title>
        <CustomSelect
          nameInputMain='reason_all'
          showAdditionalInputs={true}
          items={[
            {
              value: '5',
              name: 'participation',
              id: 'participation',
              text: 'Участие (+5)',
              type: 'checkbox',
            },
            {
              value: '10',
              name: 'prizeplace',
              id: 'prizeplace',
              text: 'Призовое место (+10)',
              type: 'checkbox',
            },
            { value: '20', name: 'victory', id: 'victory', text: 'Победа (+20)', type: 'checkbox' },
            {
              value: '5',
              name: 'evaluation',
              id: 'evaluation',
              text: 'Оценка работ (+5)',
              type: 'checkbox',
            },
            {
              value: '0',
              name: 'other',
              id: 'other',
              text: 'Другое...',
              type: 'checkbox',
              class: 'selection__list-item--other',
            },
          ]}
        />
      </label>

      <Button className='button button--purple button--alignment button_disabled' type='submit'>
        Начислить
      </Button>
    </form>
  );
}
