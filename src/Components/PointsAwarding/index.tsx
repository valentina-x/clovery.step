import React from 'react';
import styles from './style.module.scss';

/* components */
import Button, { ButtonStyles } from '../Button/index';
import Title, { TitleStyles } from '../Title/index';
import Input, { InputStyles } from '../Input/index';
import Textarea, { TextareaStyles } from '../Textarea';
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
    <form className={`${styles.pointsawardingform} ${styles.margin_mr32}`} onSubmit={handleSubmit}>
      <Title
        className={`${TitleStyles.title} ${TitleStyles.title_size20} ${TitleStyles.title_mb28}`}
      >
        Начисление баллов
      </Title>

      <label className={`${styles.margin_mb32}`}>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
        >
          Кому
        </Title>
        <Textarea
          className={`${TextareaStyles.input} ${TextareaStyles.input_textarea}`}
          name='id'
          placeholder='Введите id пользователя'
          required
        />
      </label>

      <label className={`${styles.margin_mb32}`}>
        <Title
          className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
        >
          Активность / конкурс
        </Title>
        <Input
          type='text'
          className={`${InputStyles.input} ${InputStyles.input_text}`}
          name='activity'
          placeholder='Введите текст'
          required
        />

        {/* <CustomSelect
          nameInputMain='activity'
          showAdditionalInputs={false}
          items={[
            {
              value: 'journalism',
              name: 'activity_item',
              id: 'journalism',
              text: 'Журналистика',
              type: 'radio',
              class: 'selection__listitem_radio',
            },
            {
              value: 'design',
              name: 'activity_item',
              id: 'design',
              text: 'Дизайн',
              type: 'radio',
              class: 'selection__listitem_radio',
            },
            {
              value: 'copywriting',
              name: 'activity_item',
              id: 'copywriting',
              text: 'Копирайтинг',
              type: 'radio',
              class: 'selection__listitem_radio',
            },
          ]}
        /> */}
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
              class: 'selection__listitem_other',
            },
          ]}
        />
      </label>

      <Button
        className={`${ButtonStyles.button} ${ButtonStyles.button_purple} ${ButtonStyles.button_alignment} ${ButtonStyles.button_disabled}`}
        type='submit'
      >
        Начислить
      </Button>
    </form>
  );
}
