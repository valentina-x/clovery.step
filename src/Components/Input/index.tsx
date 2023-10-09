import React, { InputHTMLAttributes } from 'react';
import './style.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const Input: React.FC<IInputProps> = ({ className, ...rest }) => {
  return <input className={className} {...rest} />;
};

export default Input;
