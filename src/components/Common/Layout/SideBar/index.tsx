import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useRef } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import useOutSideClick from '@/hooks/useOutSideClick';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
} from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);
export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);

  const popOverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsPopOver(!isPopOver);
  };

  useOutSideClick({ ref: popOverRef, callback: () => setIsPopOver(false) });

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <HomeIcon />
        </Link>
        <button type="button" aria-label="Close" onClick={popOverClick}>
          <AddIcon fill="#9747FF" />
        </button>
        {isPopOver && <AddContentPopOver popOverRef={popOverRef} />}
        <BellIcon />
        <Link href="/profile">
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}
