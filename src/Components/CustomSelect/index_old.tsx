import React, { useState, useRef, useEffect } from 'react';
import CustomSelectStyles from './style.module.scss';

import Input, { InputStyles } from '../Input/index';
import Title, { TitleStyles } from '../Title/index';

interface CustomSelectProps {
  nameInputMain: string;
  items: { value: string; name: string; id: string; text: string; type: string; class?: string }[];
  showAdditionalInputs?: boolean;
  validateReasonAndPoints: (fields: { reason_all: string; points: string }) => {
    reasonAll: { message: string; hasError: boolean };
    points: { message: string; hasError: boolean };
  };
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  nameInputMain,
  items,
  showAdditionalInputs,
  validateReasonAndPoints,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectionRef = useRef<HTMLDivElement>(null);

  const [reasonAllError, setReasonAllError] = useState({ message: '', hasError: false });
  const [pointsError, setPointsError] = useState({ message: '', hasError: false });

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (selectionRef.current && !selectionRef.current.contains(target)) {
        const input = selectionRef.current.querySelector(
          `.${CustomSelectStyles.selection__input}`,
        ) as HTMLElement;
        const list = selectionRef.current.querySelector(
          `.${CustomSelectStyles.selection__list}`,
        ) as HTMLElement;
        list.classList.remove(`${CustomSelectStyles.active}`);
        input.classList.remove(`${CustomSelectStyles.active}`);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = event.currentTarget as HTMLDivElement;
    if (input?.classList.contains(`${CustomSelectStyles.selection__input}`)) {
      input?.classList.toggle(`${CustomSelectStyles.active}`);
      const list = (input.parentElement as HTMLElement).querySelector(
        `.${CustomSelectStyles.selection__list}`,
      ) as HTMLElement;
      if (list) {
        list.classList.toggle(`${CustomSelectStyles.active}`);
      }
    }
  };

  const [errors, setErrors] = useState({
    reasonAll: { message: '', hasError: false },
    points: { message: '', hasError: false },
  });

  const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const label = event.target as HTMLLabelElement;
    const parentLabel = label.parentElement as HTMLElement;
    const parentList = parentLabel.parentElement as HTMLElement;
    const labelText = label.querySelector('span')?.textContent;
    if (labelText) {
      setSelectedItems((prev) => {
        const isAlreadySelected = prev.includes(labelText);
        if (
          labelText &&
          label.classList.contains(`${CustomSelectStyles.selection__listitem_radio}`)
        ) {
          parentLabel.classList.remove(`${CustomSelectStyles.active}`);
          (
            parentList.querySelector(`.${CustomSelectStyles.selection__input}`) as HTMLElement
          ).classList.remove(`${CustomSelectStyles.active}`);
          return isAlreadySelected ? prev : [labelText];
        } else {
          return isAlreadySelected
            ? prev.filter((item) => item !== labelText)
            : [...prev, labelText];
        }
      });

      setSelectedItems((prev) => {
        const input = parentList.querySelector(
          `.${CustomSelectStyles.selection__input} input[name='${nameInputMain}']`,
        ) as HTMLInputElement;
        if (input) {
          if (prev.length === 0) {
            input.value = '';
            input.placeholder = 'Выберите из списка';
          } else {
            input.value = prev.join(', ');
            input.placeholder = prev.join(', ');
          }
        }
        return prev;
      });
    }

    if (label.classList.contains(`${CustomSelectStyles.selection__listitem_other}`)) {
      const list = label.parentNode as HTMLElement;
      const dopinputs = document.querySelector(`.${CustomSelectStyles.dopinputs}`) as HTMLElement;
      list.classList.remove(`${CustomSelectStyles.active}`);
      if (dopinputs.classList.contains(`${CustomSelectStyles.dopinputs_hidden}`)) {
        dopinputs.classList.remove(`${CustomSelectStyles.dopinputs_hidden}`);
      } else {
        dopinputs.classList.add(`${CustomSelectStyles.dopinputs_hidden}`);
      }
    }

    const input = document.querySelector('input[name="reason_all"]') as HTMLInputElement;

    const fields = {
      reason_all: selectedItems.join(', '), // Подставляем текущее значение selectedItems
      points: '', // Подставляем значение points, если необходимо
    };

    console.log('fields.reason_all', fields.reason_all);

    const validationResults = validateReasonAndPoints(fields);
    setReasonAllError(validationResults.reasonAll);

    setErrors({
      ...errors,
      reasonAll: validationResults.reasonAll,
      points: validationResults.points,
    });
  };

  return (
    <>
      <div ref={selectionRef} className={CustomSelectStyles.selection}>
        <div className={CustomSelectStyles.selection__item}>
          <div
            className={`${CustomSelectStyles.selection__input} ${CustomSelectStyles.selection__input_disabled}`}
            onClick={handleClick}
          >
            <input type='text' name={nameInputMain} value='' placeholder='Выберите из списка' />
            <svg>
              <use xlinkHref='#s_chevron-down'></use>
            </svg>
          </div>

          <div className={CustomSelectStyles.error}>
            {reasonAllError.hasError && <span>{reasonAllError.message}</span>}
          </div>

          <div className={CustomSelectStyles.selection__list}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <input type={item.type} value={item.value} name={item.name} id={item.id} />
                <label
                  htmlFor={item.id}
                  className={`${CustomSelectStyles.selection__listitem} ${
                    item.class ? item.class : ''
                  }`}
                  onClick={handleLabelClick}
                >
                  <svg>
                    <use xlinkHref='#s_check'></use>
                  </svg>
                  <span>{item.text}</span>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {showAdditionalInputs && (
        <div className={`${CustomSelectStyles.dopinputs} ${CustomSelectStyles.dopinputs_hidden}`}>
          <label className={`${CustomSelectStyles.margin}`}>
            <Title
              className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
            >
              Введите причину начисления
            </Title>
            <Input
              type='text'
              className={`${InputStyles.input} ${InputStyles.input_text}`}
              name='reason'
              placeholder='Введите текст'
            />
          </label>
          <label>
            <Title
              className={`${TitleStyles.title} ${TitleStyles.title_size14} ${TitleStyles.title_mb8}`}
            >
              Количество баллов
            </Title>
            <Input
              type='number'
              className={`${InputStyles.input} ${InputStyles.input_text}`}
              name='points'
              placeholder='0'
            />
          </label>
        </div>
      )}
    </>
  );
};

export { CustomSelectStyles };
export default CustomSelect;
