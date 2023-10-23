import React, { useState } from 'react';

/* components */
import Button, { ButtonStyles } from '../Button/index';
import Title, { TitleStyles } from '../Title/index';
import Input, { InputStyles } from '../Input/index';

import styles from './style.module.scss';

/* types data form */
import SearchHistoryFields from './types';

interface ISearchHistoryProps {
  onSubmit: (data: SearchHistoryFields) => void;
}
interface FormValues {
  [key: string]: string;
}

export default function SearchHistory({ onSubmit }: ISearchHistoryProps) {
  const [isShowClearButton, setIsShowClearButton] = useState(false);
  const [value, setValue] = useState<string>('');

  const handleClearButtonEmail = (e: any) => {
    const value = e.target.value;
    setValue(value);
    setIsShowClearButton(value.length > 0);
  };

  const handleClearInputEmail = () => {
    setTimeout(() => {
      setValue('');
      setIsShowClearButton(false);
    }, 0);
  };

  function isValidEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  const validateForm = (formData: SearchHistoryFields) => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (formData.email.trim() === '') {
      newErrors.email = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = { message: 'Проверьте правильность введенной почты', hasError: true };
      isValid = false;
    } else {
      newErrors.email = { message: '', hasError: false };
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data: SearchHistoryFields = {
      email: formData.get('email') as string,
    };

    const isValid = validateForm(data);

    if (isValid) {
      onSubmit(data);

      // Проверка на наличие ошибок перед сбросом
      const hasErrors = Object.values(formErrors).some((error) => error.hasError);
      if (hasErrors) {
        setFormErrors({
          email: { message: 'Проверьте вводимые почты пользователей', hasError: false },
        });
      }
    } else {
      console.log('Отправка формы не удалась из-за ошибок проверки');
    }
  };

  const [formErrors, setFormErrors] = useState<
    Record<string, { message: string; hasError: boolean }>
  >({
    email: { message: 'Проверьте вводимую почту', hasError: false },
  });

  {
    /*
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData: FormData = new FormData(form);
    let obj: FormValues = {};
    for (let [name, value] of formData) {
      obj[name] = value.toString();
    }

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

  // async function postData(data: FormData): Promise<Array<any>> {
  //   try {
  //     const response = await fetch('/article/formdata/post/user/page=3&max=8', {
  //       method: 'POST',
  //       body: data,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error! Status: ${response.status}`);
  //     } else {
  //       const data = await response.json();
  //       return data;
  //     }
  //   } catch (error) {
  //     console.error('Error fetch data:', error);
  //     throw error;
  //   }
  // }
 */
  }

  return (
    <div className={`${styles.participantid}`}>
      <Title
        className={`${TitleStyles.title} ${TitleStyles.title_size20} ${TitleStyles.title_mb20}`}
      >
        История начислений
      </Title>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.marginMb12}`}>
          <Title
            className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8} ${
              formErrors.email.hasError ? TitleStyles.title_error : ''
            }`}
          >
            Поиск по почте участника
          </Title>
          <Input
            type='text'
            className={`${InputStyles.input} ${InputStyles.input_text} ${
              formErrors.email.hasError ? InputStyles.error : ''
            }`}
            name='email'
            value={value}
            placeholder='Введите email'
            autoComplete={'off'}
            onChange={handleClearButtonEmail}
          />{' '}
          {formErrors.email.hasError && (
            <div className={`${styles.error} ${styles.error_pos} ${styles.error_text}`}>
              {formErrors.email.message}
            </div>
          )}
          {isShowClearButton && (
            <div className='clearInput clearInput_pos' onClick={handleClearInputEmail}>
              <svg
                width='8'
                height='8'
                viewBox='0 0 8 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.5 1.5L1.5 6.5M1.5 1.5L6.5 6.5'
                  stroke='#1F1F1F'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          )}
        </label>
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
