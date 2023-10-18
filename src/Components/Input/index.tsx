import React, { InputHTMLAttributes } from 'react';
import InputStyles from './style.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const Input: React.FC<IInputProps> = ({ className, ...rest }) => {
  return <input className={className} {...rest} />;
};

export { InputStyles };
export default Input;
