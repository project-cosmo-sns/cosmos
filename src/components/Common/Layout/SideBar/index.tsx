import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useRef } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import UseOutSideClick from '@/hooks/UseOutSideClick';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
  WarnIcon,
} from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);
export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const [toast, setToast] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const popOverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsPopOver(!isPopOver);
  };

  const profileClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const getlocalStorage = localStorage?.getItem('id');
    if (getlocalStorage) {
      router.push('/profile');
    } else {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }
  };
  // 인증여부를 조건을 예비로 로컬스토리지로 했습니다. api나오면 바꿀예정

  UseOutSideClick({ ref: popOverRef, callback: () => setIsPopOver(false) });

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
