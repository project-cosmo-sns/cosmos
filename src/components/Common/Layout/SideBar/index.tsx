import styles from './SideBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useRef } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import UseOutSideClick from '@/hooks/UseOutSideClick';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
} from '@/components/Common/IconCollection';

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
          <HomeIcon />
        </Link>
        <Image
          src="/images/purple.svg"
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
        <BellIcon />
        <Link href="/profile">
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}
