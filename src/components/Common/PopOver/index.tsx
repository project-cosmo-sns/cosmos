import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Children } from 'react';

const cn = classNames.bind(styles);

type PopOverProps = {
  items: string[];
};

export default function PopOver({ items }: PopOverProps) {
  return (
    <ul className={cn('container')}>
      {items.map((item, index) => (
        <li key={index} className={cn('content-list')}>
          {item}
          <Image src="/icon/right.svg" alt="right" width={24} height={24} />
        </li>
      ))}
      <li className={cn('close')}>닫기</li>
    </ul>
  );
}
