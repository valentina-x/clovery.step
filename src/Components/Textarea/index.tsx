import React, { TextareaHTMLAttributes } from 'react';
import './style.scss';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
}

const Textarea: React.FC<ITextareaProps> = ({ className, ...rest }) => {
  return <textarea className={className} {...rest} />;
};

export default Textarea;
