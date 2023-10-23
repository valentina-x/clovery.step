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

const CustomSelect: React.FC<CustomSelectProps> = ({
  nameInputMain,
  items,
  validateReasonAll,
  validatePoints,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isShowDopinputs, setIsShowDopinputs] = useState(false);
  const selectionRef = useRef<HTMLDivElement>(null);

  const [reason, setReason] = useState('');
  const [isShowClearButtonReason, setIsShowClearButtonReason] = useState(false);

  const handleClearButtonReason = (e: any) => {
    const value = e.target.value;
    setReason(value);
    setIsShowClearButtonReason(value.length > 0);
  };

  const handleClearInputReason = () => {
    setTimeout(() => {
      setReason('');
      setIsShowClearButtonReason(false);
    }, 0);
  };

  const [points, setPoints] = useState('');
  const [isShowClearButtonPoints, setIsShowClearButtonPoints] = useState(false);

  const handleClearButtonPoints = (e: any) => {
    const value = e.target.value;
    setPoints(value);
    setIsShowClearButtonPoints(value.length > 0);
  };

  const handleClearInputPoints = () => {
    setTimeout(() => {
      setPoints('');
      setIsShowClearButtonPoints(false);
    }, 0);
  };

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

    if (label.classList.contains(`${CustomSelectStyles.selection__listitem_other}`)) {
      const list = label.parentNode as HTMLElement;
      setIsShowDopinputs(!isShowDopinputs);
      list.classList.remove(`${CustomSelectStyles.active}`);
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
              onChange={handleClearButtonReason}
              value={reason}
            />
            {isShowClearButtonReason && (
              <div className='clearInput clearInput_pos' onClick={handleClearInputReason}>
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
              onChange={handleClearButtonPoints}
              value={points}
            />
            {validatePoints?.hasError && (
              <div className={`${CustomSelectStyles.error} ${CustomSelectStyles.error_text}`}>
                {validatePoints.message}
              </div>
            )}
            {isShowClearButtonPoints && (
              <div className='clearInput clearInput_pos' onClick={handleClearInputPoints}>
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
        </div>
      )}
    </>
  );
};

export default CustomSelect;
export { CustomSelectStyles };
