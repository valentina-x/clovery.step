import React, { TextareaHTMLAttributes } from 'react';
import TextareaStyles from './style.module.scss';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
}

const Textarea: React.FC<ITextareaProps> = ({ className, ...rest }) => {
  return <textarea className={className} {...rest} />;
};

export { TextareaStyles };
export default Textarea;
