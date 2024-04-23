import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
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
 * @param {React.ReactNode} children - input 뒤에 붙는 아이콘 등 다양한 것들
 * @param {HTMLAttributes<HTMLInputElement>} rest - input의 나머지 속성
 * @returns {React.ReactElement} - input 컴포넌트
 */

export default function Input({ register, children, ...rest }: InputProps) {
  return (
    <div className={cn('wrapper')}>
      <input
        className={cn('input')}
        name="commentInput"
        {...rest}
        {...register}
      />
      {children}
    </div>
  );
}
