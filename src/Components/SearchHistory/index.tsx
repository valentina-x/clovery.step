import React, { useState } from 'react';
import styles from './style.module.scss';

/* components */
import Button, { ButtonStyles } from '../Button/index';
import Title, { TitleStyles } from '../Title/index';
import Input, { InputStyles } from '../Input/index';

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
      const response = await fetch('/article/formdata/post/user/page=3&max=8', {
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
    <div className={`${styles.participantid} ${styles.title_mode}`}>
      <Title
        className={`${TitleStyles.title} ${TitleStyles.title_size20} ${TitleStyles.title_mb20}`}
      >
        История начислений
      </Title>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.marginMb12}`}>
          <Title
            className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
          >
            Поиск по ID участника
          </Title>
        </label>
        <Input
          type='text'
          className={`${InputStyles.input} ${InputStyles.input_text}`}
          name='id'
          value={value}
          placeholder='8347573687739012'
          required
          autoComplete={'off'}
          onChange={handleChange}
        />
        <Button
          className={`${ButtonStyles.button} ${ButtonStyles.button_purple} ${ButtonStyles.button_alignment}`}
          type='submit'
        >
          Поиск
        </Button>
      </form>
      <div className={`${styles.participantid__wrapper}`}>
        <div className={`${styles.participantid__info}`}>
          <div className={`${styles.participantid__infopoints}`}>
            <Title
              className={`${TitleStyles.title} ${TitleStyles.title_size14} ${styles.title_widthauto}`}
            >
              17 октября 2023, 12:00
            </Title>
            <Title
              className={`${TitleStyles.title} ${TitleStyles.title_size16r} ${styles.title_purple} ${styles.title_mode} ${styles.title_widthauto}`}
            >
              +25 баллов
            </Title>
          </div>
          <Title className={`${TitleStyles.title} ${styles.title_size12} ${TitleStyles.title_mt6}`}>
            Активность:
          </Title>
          <Title
            className={`${TitleStyles.title} ${TitleStyles.title_size16r} ${TitleStyles.title_mb20} ${TitleStyles.title_mt6}`}
          >
            Конкурс логотипов для Шага
          </Title>
          <Title className={`${TitleStyles.title} ${styles.title_size12} ${TitleStyles.title_mt6}`}>
            Причина начисления:
          </Title>
          <Title className={`${TitleStyles.title} ${TitleStyles.title_size16r}`}>
            Победа, оценка работ
          </Title>
        </div>
      </div>
    </div>
  );
}
