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
        <Link href="/">
          <Image src="/icon/home.svg" alt="home" width={24} height={24} />
        </Link>
        <Image
          src="/icon/purple.svg"
          alt="add"
          width={24}
          height={24}
          onClick={onClick}
        />
        {isPopOver && <PopOver items={['피드 작성하기', '포스트 작성하기']} />}
        <Image src="/icon/bell.svg" alt="bell" width={24} height={24} />
        <Link href="/profile">
          <Image src="/icon/user.svg" alt="profile" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
