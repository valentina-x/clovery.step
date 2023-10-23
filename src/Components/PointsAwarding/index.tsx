import React, { useState } from 'react';
import styles from './style.module.scss';

/* components */
import Button, { ButtonStyles } from '../Button/index';
import Title, { TitleStyles } from '../Title/index';
import Input, { InputStyles } from '../Input/index';
import Textarea, { TextareaStyles } from '../Textarea';
import CustomSelect, { CustomSelectStyles } from '../CustomSelect/index';

/* types data form */
import { PointsAwardingFields } from '../PointsAwarding/types';

interface IPointsAwardingProps {
  onSubmit: (data: PointsAwardingFields) => void;
}

export default function PointsAwarding({ onSubmit }: IPointsAwardingProps) {
  const [isShowClearButtonEmails, setIsShowClearButtonEmails] = useState(false);
  const [isShowClearButtonActivity, setIsShowClearButtonActivity] = useState(false);

  const [emails, setEmails] = useState('');
  const [activity, setActivity] = useState('');

  const handleClearButtonActivivty = (e: any) => {
    const value = e.target.value;
    setActivity(value);
    setIsShowClearButtonActivity(value.length > 0);
  };

  const handleClearInputActivivty = () => {
    setTimeout(() => {
      setActivity('');
      setIsShowClearButtonActivity(false);
    }, 0);
  };

  const handleEmailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    // let trimmedEmails = event.target.value.trim().replace(/,$/, '');
    setEmails(value);
    setIsShowClearButtonEmails(value.length > 0);
  };

  const handleClearInputEmails = () => {
    setTimeout(() => {
      setEmails('');
      setIsShowClearButtonEmails(false);
    }, 0);
  };

  function isValidEmails(emails: string): { valid: boolean; count: number } {
    const emailArray = emails.split(',').map((email) => email.trim());

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const count = emailArray.length;
    const valid = emailArray.every((email) => emailRegex.test(email));

    return { valid, count };
  }

  const validateForm = (formData: PointsAwardingFields) => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (formData.activity.trim() === '') {
      newErrors.activity = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else {
      newErrors.activity = {
        message: 'Введено неверное название конкурса или активности',
        hasError: false,
      };
    }

    if (formData.emails.trim() === '') {
      newErrors.emails = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else if (isValidEmails(formData.emails).count > 10) {
      newErrors.emails = {
        message: 'Нельзя за раз начислить больше, чем 10 пользователям',
        hasError: true,
      };
      isValid = false;
    } else if (!isValidEmails(formData.emails).valid) {
      newErrors.emails = { message: 'Проверьте правильность введенных данных', hasError: true };
      isValid = false;
    } else {
      newErrors.emails = { message: '', hasError: false };
    }

    if (formData.reason_all.trim() === '') {
      newErrors.reason_all = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else {
      newErrors.reason_all = {
        message: '',
        hasError: false,
      };
    }

    if (formData.points?.trim() === '') {
      newErrors.points = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else {
      newErrors.points = {
        message: '',
        hasError: false,
      };
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data: PointsAwardingFields = {
      emails: formData.get('emails') as string,
      activity: formData.get('activity') as string,
      reason_all: formData.get('reason_all') as string,
      reason: formData.get('reason') as string,
      points: formData.get('points') as string,
    };

    const isValid = validateForm(data);

    if (isValid) {
      onSubmit(data);

      // Проверка на наличие ошибок перед сбросом
      const hasErrors = Object.values(formErrors).some((error) => error.hasError);
      if (hasErrors) {
        setFormErrors({
          emails: { message: 'Проверьте вводимые почты пользователей', hasError: false },
          activity: { message: 'Введите название конкруса или активности', hasError: false },
          reason_all: { message: 'Выберите пункт из списка', hasError: false },
          points: { message: 'Введите количество баллов', hasError: false },
        });
      }
    } else {
      console.log('Отправка формы не удалась из-за ошибок проверки');
    }
  };

  const [formErrors, setFormErrors] = useState<
    Record<string, { message: string; hasError: boolean }>
  >({
    emails: { message: 'Проверьте вводимые почты пользователей', hasError: false },
    activity: { message: 'Введите название конкруса или активности', hasError: false },
    reason_all: { message: 'Выберите пункт из списка', hasError: false },
    points: { message: 'Введите количество баллов', hasError: false },
  });

  return (
    <form className={`${styles.pointsawardingform} ${styles.margin_mr32}`} onSubmit={handleSubmit}>
      <Title
        className={`${TitleStyles.title} ${TitleStyles.title_size20} ${TitleStyles.title_mb28}`}
      >
        Начисление баллов
      </Title>

      <label className={`${styles.margin_mb32}`}>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8} ${
            formErrors.emails.hasError ? TitleStyles.title_error : ''
          }`}
        >
          Кому*
        </Title>
        <Textarea
          className={`${TextareaStyles.input} ${TextareaStyles.input_textarea} ${
            formErrors.emails.hasError ? styles.error : ''
          }`}
          name='emails'
          placeholder='Введите почтовые адреса пользователей через запятую'
          onChange={handleEmailsChange}
          value={emails}
        />
        {formErrors.emails.hasError && (
          <div className={`${styles.error} ${styles.error_pos} ${styles.error_text}`}>
            {formErrors.emails.message}
          </div>
        )}
        {isShowClearButtonEmails && (
          <div className='clearInput clearInput_pos' onClick={handleClearInputEmails}>
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

      <label className={`${styles.margin_mb32}`}>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8} ${
            formErrors.activity.hasError ? TitleStyles.title_error : ''
          }`}
        >
          Мероприятие*
        </Title>
        <Input
          type='text'
          className={`${InputStyles.input} ${InputStyles.input_text} ${
            formErrors.activity.hasError ? styles.error : ''
          }`}
          name='activity'
          placeholder='Введите id мероприятия'
          onChange={handleClearButtonActivivty}
          value={activity}
        />
        {formErrors.activity.hasError && (
          <div className={`${styles.error} ${styles.error_pos} ${styles.error_text}`}>
            {formErrors.activity.message}
          </div>
        )}
        {isShowClearButtonActivity && (
          <div className='clearInput clearInput_pos' onClick={handleClearInputActivivty}>
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

      <label>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8} ${
            formErrors.reason_all.hasError ? CustomSelectStyles.error : ''
          }`}
        >
          Действие*
        </Title>
        <CustomSelect
          nameInputMain='reason_all'
          validateReasonAll={formErrors.reason_all}
          validatePoints={formErrors.points}
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
            {
              value: '20',
              name: 'victory',
              id: 'victory',
              text: 'Победа (+20)',
              type: 'checkbox',
            },
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
              class: `${CustomSelectStyles.selection__listitem_other}`,
            },
          ]}
        />
      </label>

      <Button
        className={`${ButtonStyles.button} ${ButtonStyles.button_purple} ${ButtonStyles.button_alignment}`}
        type='submit'
      >
        Начислить
      </Button>
    </form>
  );
}
