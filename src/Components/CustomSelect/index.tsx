import React from 'react';
import './style.scss';

import Input from '../Input/index';
import Title from '../Title/index';

// interface ICustomSelectProps {
//   className: string;
// }

const CustomSelect: React.FC = ({}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = event.target as HTMLElement;
    if (input?.classList.contains('selection__input')) {
      input?.classList.toggle('active');
    }
    const list = (input.parentElement as HTMLElement).querySelector(
      '.selection__list',
    ) as HTMLElement;
    if (list) {
      list?.classList.toggle('active');
    }
  };

  return (
    <>
      <div className='selection margin--mb32'>
        <div className='selection__item'>
          <div className='selection__input' onClick={handleClick}>
            <input
              type='text'
              value=''
              placeholder='Выберите из списка'
              disabled
            />
            <svg>
              <use xlinkHref='#s_chevron-down'></use>
            </svg>
          </div>
          <div className='selection__list active'>
            <input
              type='checkbox'
              value='5'
              name='participation'
              id='participation'
            />
            <label htmlFor='participation' className='selection__list-item'>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Участие (+5)</span>
            </label>
            <input
              type='checkbox'
              value='10'
              name='prizeplace'
              id='prizeplace'
            />
            <label htmlFor='prizeplace' className='selection__list-item'>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Призовое место (+10)</span>
            </label>
            <input type='checkbox' value='20' name='victory' id='victory' />
            <label htmlFor='victory' className='selection__list-item'>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Победа (+20)</span>
            </label>
            <input
              type='checkbox'
              value='20'
              name='evaluation'
              id='evaluation'
            />
            <label htmlFor='evaluation' className='selection__list-item'>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Оценка работ (+5)</span>
            </label>
            <input type='checkbox' value='0' name='other' id='other' />
            <label htmlFor='other' className='selection__list-item'>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Другое...</span>
            </label>
          </div>
        </div>
      </div>
      <div className='dopinputs'>
        <label className='margin margin--mb32'>
          <Title className='title title--size14 title--mb8'>
            Введите причину начисления
          </Title>
          <Input
            type='text'
            className='input input--text'
            name='reason'
            placeholder='Введите текст'
            required
          />
        </label>
        <label>
          <Title className='title title--size14 title--mb8'>
            Количество баллов
          </Title>
          <Input
            type='number'
            className='input input--text'
            name='reason'
            placeholder='0'
            required
          />
        </label>
      </div>
    </>
  );
};

export default CustomSelect;
