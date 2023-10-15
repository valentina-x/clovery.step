import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

import Input from '../Input/index';
import Title from '../Title/index';

interface CustomSelectProps {
  items: { value: string; label: string }[]; // Список элементов
  type: 'checkbox' | 'radio'; // Тип компонента
  onSelect: (selectedItems: string[]) => void; // Функция при выборе элемента
  showAdditionalInputs?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ items, type, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (selectionRef.current && !selectionRef.current.contains(target)) {
        const input = document.querySelector('.selection__input') as HTMLElement;
        const list = document.querySelector('.selection__list') as HTMLElement;
        list.classList.remove('active');
        input.classList.remove('active');
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = event.target as HTMLElement;
    if (input?.classList.contains('selection__input')) {
      input?.classList.toggle('active');
      const list = (input.parentElement as HTMLElement).querySelector(
        '.selection__list',
      ) as HTMLElement;
      if (list) {
        list.classList.toggle('active');
      }
    }
  };

  const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const label = event.target as HTMLLabelElement;
    const labelText = label.querySelector('span')?.textContent;
    if (labelText) {
      onSelect((prev) => {
        const isAlreadySelected = prev.includes(labelText);
        if (isAlreadySelected) {
          return prev.filter((item) => item !== labelText);
        } else {
          return [...prev, labelText];
        }
      });

      onSelect((prev) => {
        const input = document.querySelector(
          '.selection__input input[name="reason_all"]',
        ) as HTMLInputElement;
        if (input) {
          input.value = prev.join(', ');
          input.placeholder = prev.join(', ');
        }
        return prev;
      });
    }

    if (label.classList.contains('selection__list-item--other')) {
      const dopinputs = document.querySelector('.dopinputs') as HTMLElement;
      // const inputs: NodeListOf<HTMLInputElement> = dopinputs.querySelectorAll('input');
      const list = document.querySelector('.selection__list') as HTMLElement;
      list.classList.remove('active');
      if (dopinputs.classList.contains('dopinputs_hidden')) {
        dopinputs.classList.remove('dopinputs_hidden');
        // inputs.forEach((input) => {
        //   input.required = true;
        // });
      } else {
        dopinputs.classList.add('dopinputs_hidden');
        // inputs.forEach((input) => {
        //   input.required = false;
        // });
      }
    }
  };

  return (
    <>
      <div ref={selectionRef} className='selection margin--mb32'>
        <div className='selection__item'>
          <div className='selection__input' onClick={handleClick}>
            <input
              type='text'
              name='reason_all'
              value=''
              placeholder='Выберите из списка'
              disabled
            />
            <svg>
              <use xlinkHref='#s_chevron-down'></use>
            </svg>
          </div>
          <div className='selection__list'>
            <input type='checkbox' value='5' name='participation' id='participation' />
            <label
              htmlFor='participation'
              className='selection__list-item'
              onClick={handleLabelClick}
            >
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Участие (+5)</span>
            </label>
            <input type='checkbox' value='10' name='prizeplace' id='prizeplace' />
            <label htmlFor='prizeplace' className='selection__list-item' onClick={handleLabelClick}>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Призовое место (+10)</span>
            </label>
            <input type='checkbox' value='20' name='victory' id='victory' />
            <label htmlFor='victory' className='selection__list-item' onClick={handleLabelClick}>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Победа (+20)</span>
            </label>
            <input type='checkbox' value='20' name='evaluation' id='evaluation' />
            <label htmlFor='evaluation' className='selection__list-item' onClick={handleLabelClick}>
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Оценка работ (+5)</span>
            </label>
            <input type='checkbox' value='0' name='other' id='other' />
            <label
              htmlFor='other'
              className='selection__list-item selection__list-item--other'
              onClick={handleLabelClick}
            >
              <svg>
                <use xlinkHref='#s_check'></use>
              </svg>
              <span>Другое...</span>
            </label>
          </div>
        </div>
      </div>
      {showAdditionalInputs && (
        <div className='dopinputs dopinputs_hidden'>
          <label className='margin margin--mb32'>
            <Title className='title title--size14 title--mb8'>Введите причину начисления</Title>
            <Input
              type='text'
              className='input input--text'
              name='reason'
              placeholder='Введите текст'
            />
          </label>
          <label>
            <Title className='title title--size14 title--mb8'>Количество баллов</Title>
            <Input
              type='number'
              className='input input--text'
              name='points'
              placeholder='0'
              min='5'
              max='100'
            />
          </label>
        </div>
      )}
    </>
  );
};

export default CustomSelect;
