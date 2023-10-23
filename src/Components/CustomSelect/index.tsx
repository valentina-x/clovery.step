import React, { useState, useRef, useEffect } from 'react';
import CustomSelectStyles from './style.module.scss';
import Input, { InputStyles } from '../Input/index';
import Title, { TitleStyles } from '../Title/index';
import ICustomSelectRef from './ICustomSelectRef ';

interface CustomSelectProps extends React.RefAttributes<ICustomSelectRef> {
  nameInputMain: string;
  items: { value: string; name: string; id: string; text: string; type: string; class?: string }[];
  validateReasonAll?: {
    message: string;
    hasError: boolean;
  };
  validatePoints?: {
    message: string;
    hasError: boolean;
  };
}

// export interface ValidationResult {
//   message: string;
//   hasError: boolean;
//   isValidCustomSelect: boolean;
// }

// export interface CustomSelectValidations {
//   reasonAll: ValidationResult;
//   points: ValidationResult;
//   isValidCustomSelect: boolean;
// }

const CustomSelect: React.FC<CustomSelectProps> = ({
  nameInputMain,
  items,
  validateReasonAll,
  validatePoints,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [reasonAllError, setReasonAllError] = useState({ message: '', hasError: false });
  // const [pointsError, setPointsError] = useState({ message: '', hasError: false });

  const [isShowDopinputs, setIsShowDopinputs] = useState(false);

  const selectionRef = useRef<HTMLDivElement>(null);

  // const validateReasonAndPoints = () => {
  //   let isValidCustomSelect = true;
  //   const errors = {
  //     reasonAll: { message: 'Это поле обязательно', hasError: false },
  //     points: { message: 'Это поле обязательно', hasError: false },
  //   };

  //   if (selectedItems.length === 0) {
  //     errors.reasonAll = {
  //       message: 'Выберите пункт из списка',
  //       hasError: true,
  //     };
  //     isValidCustomSelect = false;
  //   }

  //   setReasonAllError(errors.reasonAll);
  //   setPointsError(errors.points);
  // };

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

    // if (label.classList.contains(`${CustomSelectStyles.selection__listitem_other}`)) {
    //   const list = label.parentNode as HTMLElement;
    //   const dopinputs = document.querySelector(`.${CustomSelectStyles.dopinputs}`) as HTMLElement;
    //   list.classList.remove(`${CustomSelectStyles.active}`);
    //   if (dopinputs.classList.contains(`${CustomSelectStyles.dopinputs_hidden}`)) {
    //     isShowDopinputs = true;
    //     dopinputs.classList.remove(`${CustomSelectStyles.dopinputs_hidden}`);
    //   } else {
    //     isShowDopinputs = false;
    //     dopinputs.classList.add(`${CustomSelectStyles.dopinputs_hidden}`);
    //   }
    // }

    if (label.classList.contains(`${CustomSelectStyles.selection__listitem_other}`)) {
      const list = label.parentNode as HTMLElement;
      setIsShowDopinputs(!isShowDopinputs);
      list.classList.remove(`${CustomSelectStyles.active}`);
      // const dopinputs = document.querySelector(`.${CustomSelectStyles.dopinputs}`) as HTMLElement;
      // if (dopinputs.classList.contains(`${CustomSelectStyles.dopinputs_hidden}`)) {
      //   dopinputs.classList.remove(`${CustomSelectStyles.dopinputs_hidden}`);
      // } else {
      //   dopinputs.classList.add(`${CustomSelectStyles.dopinputs_hidden}`);
      // }
    }
  };

  return (
    <>
      <div ref={selectionRef} className={CustomSelectStyles.selection}>
        <div className={CustomSelectStyles.selection__item}>
          <div
            className={`${CustomSelectStyles.selection__input} ${
              CustomSelectStyles.selection__input_disabled
            } ${validateReasonAll?.hasError ? CustomSelectStyles.error : ''}`}
            onClick={handleClick}
          >
            <input
              type='text'
              name={nameInputMain}
              placeholder='Выберите из списка'
              autoComplete='off'
            />
            <svg>
              <use xlinkHref='#s_chevron-down'></use>
            </svg>
          </div>

          {validateReasonAll?.hasError && (
            <div
              className={`${CustomSelectStyles.error}  ${CustomSelectStyles.error_pos} ${CustomSelectStyles.error_text}`}
            >
              {validateReasonAll.message}
            </div>
          )}

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

      {isShowDopinputs && (
        <div className={`${CustomSelectStyles.dopinputs}`}>
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
              className={`${TitleStyles.title} ${TitleStyles.title_size14} ${
                TitleStyles.title_mb8
              }  ${validatePoints?.hasError ? CustomSelectStyles.error : ''}`}
            >
              Количество баллов
            </Title>
            <Input
              type='number'
              className={`${InputStyles.input} ${InputStyles.input_text} ${
                validatePoints?.hasError ? CustomSelectStyles.error : ''
              }`}
              name='points'
              placeholder='0'
            />
            {validatePoints?.hasError && (
              <div className={`${CustomSelectStyles.error} ${CustomSelectStyles.error_text}`}>
                {validatePoints.message}
              </div>
            )}
          </label>
        </div>
      )}
    </>
  );
};

export default CustomSelect;
export { CustomSelectStyles };
