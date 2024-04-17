import styles from './SideBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useRef } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import UseOutSideClick from '@/hooks/UseOutSideClick';

const cn = classNames.bind(styles);
export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);

  const popOverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsPopOver(!isPopOver);
  };

  UseOutSideClick({ ref: popOverRef, callback: () => setIsPopOver(false) });

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <Image src="/icon/home.svg" alt="home" width={24} height={24} />
        </Link>
        <Image
          src="/icon/purple.svg"
          alt="add"
          width={24}
          height={24}
          onClick={popOverClick}
        />
        {isPopOver && (
          <AddContentPopOver
            popOverRef={popOverRef}
            items={['피드 작성하기', '포스트 작성하기']}
          />
        )}
        <Image src="/icon/bell.svg" alt="bell" width={24} height={24} />
        <Link href="/profile">
          <Image src="/icon/user.svg" alt="profile" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
