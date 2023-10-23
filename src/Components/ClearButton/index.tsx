import React from 'react';

interface IClearButton {
  isInputEmpty: boolean;
  handleClearElement: (event: any) => void;
}

const ClearButton = ({ isInputEmpty, handleClearElement }: IClearButton) => {
  return (
    <div className='clearInput clearInput_pos' onClick={handleClearElement}>
      <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.5 1.5L1.5 6.5M1.5 1.5L6.5 6.5'
          stroke='#1F1F1F'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

export default ClearButton;
