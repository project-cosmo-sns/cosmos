import classNames from 'classnames/bind';
import React, { ChangeEvent, HTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Textarea.module.scss';
import { useToast } from '@/hooks/useToast';

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
  const { showToastHandler } = useToast();
  const [value, setValue] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 300) {
      showToastHandler('300자 이상 작성할 수 없습니다.', 'warn');
      return '';
    }
    setValue(event.target.value);
    return '';
  };

  return (
    <div className={cn('wrapper')}>
      <textarea
        className={cn('textarea')}
        name="commentInput"
        {...rest}
        {...register}
        value={value}
        onChange={handleTextChange}
      />
      {children}
    </div>
  );
}
