import React from 'react';
import ButtonStyles from './style.module.scss';

interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  type: string;
}

const Button: React.FC<IButtonProps> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

export { ButtonStyles };
export default Button;
