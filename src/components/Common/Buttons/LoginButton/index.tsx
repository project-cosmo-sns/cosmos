import React from 'react';
import styles from './LoginButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type LoginButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function LoginButton({ text, icon, onClick }: LoginButtonProps) {
  return (
    <button type="button" className={cn('login-button')} onClick={onClick}>
      {icon}
      <span>{text}</span>
    </button>
  );
}
