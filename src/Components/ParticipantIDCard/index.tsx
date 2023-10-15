import React from 'react';
import './style.scss';

/* components */
import Button from '../Button/index';
import Title from '../Title/index';
import Input from '../Input/index';

/* types data form */
import { ParticipantIDFields } from '../ParticipantIDCard/types';

interface IParticipantIDProps {
  onSubmit: (data: ParticipantIDFields) => void;
}

// type FormFields = {
// 	id: HTMLInputElement,
// 	activity: HTMLInputElement,

// }

export default function ParticipantID({ onSubmit }: IParticipantIDProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  };

  return (
    <div className='participantid'>
      <Title className='title title--size20 title--mb20'>История начислений</Title>
      <form onSubmit={handleSubmit}>
        <label className='margin margin--mb12'>
          <Title className='title title--size14 title--mb8'>Поиск по ID участника</Title>
        </label>
        <Input
          type='text'
          className='input input--text'
          name='id'
          placeholder='8347573687739012'
          required
        />
        <Button className='button button--purple button--alignment' type='submit'>
          Поиск
        </Button>
      </form>
      <div className='participantid__wrapper'>
        <div className='participantid__info'>
          <div className='participantid__info-points'>
            <Title className='title title--size14'>17 октября 2023, 12:00</Title>
            <Title className='title title--size16r title--purple title--mode'>+25 баллов</Title>
          </div>
          <Title className='title title--size12 title--mt6'>Активность:</Title>
          <Title className='title title--size16r title--mb20'>Конкурс логотипов для Шага</Title>
          <Title className='title title--size12 title--mt9'>Причина начисления:</Title>
          <Title className='title title--size16r'>Победа, оценка работ</Title>
        </div>
        <div className='participantid__info'>
          <div className='participantid__info-points'>
            <Title className='title title--size14'>17 октября 2023, 12:00</Title>
            <Title className='title title--size16r title--purple title--mode'>+25 баллов</Title>
          </div>
          <Title className='title title--size12 title--mt9'>Активность:</Title>
          <Title className='title title--size16r title--mb20'>Конкурс логотипов для Шага</Title>
          <Title className='title title--size12 title--mt9'>Причина начисления:</Title>
          <Title className='title title--size16r'>Победа, оценка работ</Title>
        </div>
        <div className='participantid__info'>
          <div className='participantid__info-points'>
            <Title className='title title--size14'>17 октября 2023, 12:00</Title>
            <Title className='title title--size16r title--purple title--mode'>+25 баллов</Title>
          </div>
          <Title className='title title--size12 title--mt9'>Активность:</Title>
          <Title className='title title--size16r title--mb20'>Конкурс логотипов для Шага</Title>
          <Title className='title title--size12 title--mt9'>Причина начисления:</Title>
          <Title className='title title--size16r'>Победа, оценка работ</Title>
        </div>
        <div className='participantid__info'>
          <div className='participantid__info-points'>
            <Title className='title title--size14'>17 октября 2023, 12:00</Title>
            <Title className='title title--size16r title--purple title--mode'>+25 баллов</Title>
          </div>
          <Title className='title title--size12 title--mt9'>Активность:</Title>
          <Title className='title title--size16r title--mb20'>Конкурс логотипов для Шага</Title>
          <Title className='title title--size12 title--mt9'>Причина начисления:</Title>
          <Title className='title title--size16r'>Победа, оценка работ</Title>
        </div>
      </div>
    </div>
  );
}
