import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';
import React, { HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
  accept?: string;
  name?: string;
}

const cn = classNames.bind(styles);

/**
 *
 * @param {UseFormRegisterReturn} register - react-hook-form의 register
 * @param {React.ReactNode} children - textarea 뒤에 붙는 아이콘 등 다양한 것들
 * @param {HTMLAttributes<HTMLInputElement>} rest - textarea의 나머지 속성
 * @returns {React.ReactElement} - textarea 컴포넌트
 */

export default function TextArea({
  register,
  children,
  ...rest
}: TextareaProps) {
  return (
    <div className={cn('wrapper')}>
      <textarea
        className={cn('textarea')}
        name="commentInput"
        {...rest}
        {...register}
      />
      {children}
    </div>
  );
}
