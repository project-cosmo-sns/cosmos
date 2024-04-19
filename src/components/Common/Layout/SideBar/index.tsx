import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import Notification from '@/components/Common/Layout/Notification';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
} from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState({
    add: false,
    bell: false,
  });

  const togglePopOver = (
    e: React.MouseEvent<HTMLElement>,
    popOverType: 'add' | 'bell',
  ) => {
    e.stopPropagation();
    setIsPopOver((prevState) => ({
      ...prevState,
      [popOverType]: !prevState[popOverType],
    }));
  };

  const handleClosePopOver = () => {
    setIsPopOver({
      add: false,
      bell: false,
    });
  };

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <HomeIcon />
        </Link>
        <div
          className={cn('icon-box')}
          onClick={(e) => togglePopOver(e, 'add')}
        >
          <AddIcon fill="#9747FF" />
          {isPopOver.add && <AddContentPopOver onClose={handleClosePopOver} />}
        </div>
        <div
          className={cn('icon-box')}
          onClick={(e) => togglePopOver(e, 'bell')}
        >
          <BellIcon />
          {isPopOver.bell && <Notification onClose={handleClosePopOver} />}
        </div>
        <Link href="/profile">
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}
