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
  WarnIcon,
} from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const [toast, setToast] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);

  const popOverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsPopOver(!isPopOver);
  };

  const profileClick = (e: React.MouseEvent<HTMLElement>) => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };
  // 일단은 이렇게 사용하고 데이터 연결하고 나중에 수정

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
        <Link href="/profile" onClick={profileClick}>
          <UserIcon />
        </Link>
        {toast && <Toast icon={WarnIcon} text="인증 대기중입니다." />}
      </div>
    </div>
  );
}
