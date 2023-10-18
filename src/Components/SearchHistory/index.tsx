import React, { useState } from 'react';
import './style.scss';

/* components */
import Button from '../Button/index';
import Title from '../Title/index';
import Input from '../Input/index';

/* types data form */
import { SearchHistoryFields } from './types';

interface ISearchHistoryProps {
  onSubmit: (data: SearchHistoryFields) => void;
}

// type FormFields = {
// 	id: HTMLInputElement,
// }

export default function SearchHistory({ onSubmit }: ISearchHistoryProps) {
  const [value, setValue] = useState<string>('');

  interface FormValues {
    [key: string]: string;
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData: FormData = new FormData(form);
    let obj: FormValues = {};
    for (let [name, value] of formData) {
      obj[name] = value.toString(); // Преобразуем значение в строку
    }

    // console.log(obj);

    const result = postData(formData);

    console.log('result', result);

    // 1. цикл по массиву []
    // 1.1 перебираем объекты, которые внутри [{}, {}, {}] и получаем данные из каждого объекта. Например obj.date, obj.points и т.д.
    // 1.1.1 выводим шаблон html карточки (очистка контейнера, вывод) с этими данными в виде шаблонной строки ${obj.points}

    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index]; // {}
    //   for (let obj of element) {
    //     obj
    //   }
    // }
  };

  async function postData(data: FormData): Promise<Array<any>> {
    try {
      const response = await fetch('/article/formdata/post/user', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetch data:', error);
      throw error;
    }
  }

  const handleChange = (event: any) => {
    const target = event.target as HTMLInputElement;
    setValue(event.target.value);
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
          value={value}
          placeholder='8347573687739012'
          required
          autoComplete={'off'}
          onChange={handleChange}
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
      </div>
    </div>
  );
}
