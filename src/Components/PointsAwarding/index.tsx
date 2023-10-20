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
  function isValidEmails(emails: string): boolean {
    const emailArray = emails.split(',').map((email) => email.trim());

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailArray.every((email) => emailRegex.test(email));
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
    } else {
      if (!isValidEmails(formData.emails)) {
        newErrors.emails = { message: 'Проверьте правильность введенных данных', hasError: true };
        isValid = false;
      } else {
        newErrors.emails = { message: '', hasError: false };
      }
    }

    if (formData.reasonAll.trim() === '') {
      newErrors.reasonAll = { message: 'Это поле обязательно', hasError: true };
      isValid = false;
    } else {
      newErrors.reasonAll = {
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
      reasonAll: formData.get('reason_all') as string,
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
          reasonAll: { message: 'Выберите пункт из списка', hasError: false },
          // ...
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
    reasonAll: { message: 'Выберите пункт из списка', hasError: false },
    // ...
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
          Кому
        </Title>
        <Textarea
          className={`${TextareaStyles.input} ${TextareaStyles.input_textarea} ${
            formErrors.emails.hasError ? styles.error : ''
          }`}
          name='emails'
          placeholder='Введите email адреса через запятую'
        />
        {formErrors.emails.hasError && (
          <div className={`${styles.error} ${styles.error_pos}`}>{formErrors.emails.message}</div>
        )}
      </label>

      <label className={`${styles.margin_mb32}`}>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8} ${
            formErrors.activity.hasError ? TitleStyles.title_error : ''
          }`}
        >
          Активность / конкурс
        </Title>
        <Input
          type='text'
          className={`${InputStyles.input} ${InputStyles.input_text} ${
            formErrors.activity.hasError ? styles.error : ''
          }`}
          name='activity'
          placeholder='Введите текст'
        />
        {formErrors.activity.hasError && (
          <div className={`${styles.error} ${styles.error_pos}`}>{formErrors.activity.message}</div>
        )}
      </label>

      <label>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
        >
          Причина начисления
        </Title>
        <CustomSelect
          nameInputMain='reason_all'
          showAdditionalInputs={true}
          error={formErrors.reason_all}
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
