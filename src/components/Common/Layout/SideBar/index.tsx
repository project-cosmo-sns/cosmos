import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useRef } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import Notification from '@/components/Common/Layout/Notification';
import useOutSideClick from '@/hooks/useOutSideClick';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
} from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [isAddPopOver, setIsAddPopOver] = useState(false);
  const [isBellPopOver, setIsBellPopOver] = useState(false);
  const addPopOverRef = useRef<HTMLDivElement>(null);
  const bellPopOverRef = useRef<HTMLDivElement>(null);

  const toggleAddPopOver = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsAddPopOver(!isAddPopOver);
  };

  const toggleBellPopOver = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsBellPopOver(!isBellPopOver);
  };

  useOutSideClick({
    ref: addPopOverRef,
    callback: () => setIsAddPopOver(false),
  });
  useOutSideClick({
    ref: bellPopOverRef,
    callback: () => setIsBellPopOver(false),
  });

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <HomeIcon />
        </Link>
        <button
          type="button"
          aria-label="Add"
          onClick={toggleAddPopOver}
          className={cn('icon-button')}
        >
          <AddIcon fill="#9747FF" />
        </button>
        {isAddPopOver && <AddContentPopOver popOverRef={addPopOverRef} />}
        <button
          type="button"
          aria-label="Bell"
          onClick={toggleBellPopOver}
          className={cn('icon-button')}
        >
          <BellIcon />
        </button>
        {isBellPopOver && <Notification popOverRef={bellPopOverRef} />}
        <Link href="/profile">
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}
