import React from 'react';
import TitleStyles from './style.module.scss';

interface ITitleProps {
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<ITitleProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export { TitleStyles };
export default Title;
