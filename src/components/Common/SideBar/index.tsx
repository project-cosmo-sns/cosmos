import styles from './SideBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import PopOver from '../PopOver';
import { useState } from 'react';

const cn = classNames.bind(styles);
export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const onClick = () => {
    setIsPopOver(!isPopOver);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">1</Link>

        {isPopOver && <PopOver />}
        <Link href="/profile">2</Link>
      </div>
    </div>
  );
}
