import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';

import Input, { InputStyles } from '../Input/index';
import Title, { TitleStyles } from '../Title/index';

interface CustomSelectProps {
  nameInputMain: string;
  items: { value: string; name: string; id: string; text: string; type: string; class?: string }[];
  // onSelect: (selectedItems: string[]) => void;
  showAdditionalInputs?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  nameInputMain,
  items,
  showAdditionalInputs,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (selectionRef.current && !selectionRef.current.contains(target)) {
        const input = selectionRef.current.querySelector(
          `.${styles.selection__input}`,
        ) as HTMLElement;
        const list = selectionRef.current.querySelector(
          `.${styles.selection__list}`,
        ) as HTMLElement;
        list.classList.remove(`${styles.active}`);
        input.classList.remove(`${styles.active}`);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = event.currentTarget as HTMLDivElement;
    if (input?.classList.contains(`${styles.selection__input}`)) {
      input?.classList.toggle(`${styles.active}`);
      const list = (input.parentElement as HTMLElement).querySelector(
        `.${styles.selection__list}`,
      ) as HTMLElement;
      if (list) {
        list.classList.toggle(`${styles.active}`);
      }
    }
  };

  const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const label = event.target as HTMLLabelElement;
    const parentLabel = label.parentElement as HTMLElement;
    const parentList = parentLabel.parentElement as HTMLElement;
    const labelText = label.querySelector('span')?.textContent;
    if (labelText) {
      setSelectedItems((prev) => {
        const isAlreadySelected = prev.includes(labelText);
        if (labelText && label.classList.contains(`${styles.selection__listitem_radio}`)) {
          parentLabel.classList.remove(`${styles.active}`);
          (parentList.querySelector(`.${styles.selection__input}`) as HTMLElement).classList.remove(
            `${styles.active}`,
          );
          return isAlreadySelected ? prev : [labelText];
        } else {
          return isAlreadySelected
            ? prev.filter((item) => item !== labelText)
            : [...prev, labelText];
        }
      });

      setSelectedItems((prev) => {
        const input = parentList.querySelector(
          `.${styles.selection__input} input[name='${nameInputMain}']`,
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

    if (label.classList.contains(`selection__listitem_other`)) {
      const list = label.parentNode as HTMLElement;
      const dopinputs = document.querySelector(`.${styles.dopinputs}`) as HTMLElement;
      list.classList.remove(`${styles.active}`);
      if (dopinputs.classList.contains(`${styles.dopinputs_hidden}`)) {
        dopinputs.classList.remove(`${styles.dopinputs_hidden}`);
      } else {
        dopinputs.classList.add(`${styles.dopinputs_hidden}`);
      }
    }
  };

  return (
    <>
      <div ref={selectionRef} className={styles.selection}>
        <div className={styles.selection__item}>
          <div className={styles.selection__input} onClick={handleClick}>
            <input
              type='text'
              name={nameInputMain}
              value=''
              placeholder='Выберите из списка'
              disabled
            />
            <svg>
              <use xlinkHref='#s_chevron-down'></use>
            </svg>
          </div>

          <div className={styles.selection__list}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <input type={item.type} value={item.value} name={item.name} id={item.id} />
                <label
                  htmlFor={item.id}
                  className={`${styles.selection__listitem} ${item.class ? item.class : ''}`}
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
        <div className={`${styles.dopinputs} ${styles.dopinputs_hidden}`}>
          <label className={`${styles.margin}`}>
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
