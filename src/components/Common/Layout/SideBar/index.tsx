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
  WarnIcon,
} from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import LoginModal from '../../LoginModal';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/Cookies';
import { memberData } from '@/components/Profile/FollowList/FollowMockData';
import Image from 'next/image';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [activePopover, setActivePopover] = useState<'add' | 'bell' | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const sessionId = getCookie('sessionId');

  const profileClick = () => {
    if (sessionId) {
      router.push('/profile');
      return;
    }
    setModalVisible(!modalVisible);
  };

  const togglePopOver = (
    e: React.MouseEvent<HTMLElement>,
    popOverType: 'add' | 'bell',
  ) => {
    e.stopPropagation();
    setActivePopover((prevPopover) =>
      prevPopover === popOverType ? null : popOverType,
    );
  };

  const handleClosePopOver = () => {
    setActivePopover(null);
  };

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <HomeIcon />
        </Link>
        <div
          className={cn('icon-box', 'add-icon')}
          onClick={(e) => togglePopOver(e, 'add')}
        >
          <AddIcon fill="#9747FF" />
          {activePopover === 'add' && (
            <AddContentPopOver onClose={handleClosePopOver} />
          )}
        </div>
        <div
          className={cn('icon-box')}
          onClick={(e) => togglePopOver(e, 'bell')}
        >
          <BellIcon />
          {activePopover === 'bell' && (
            <Notification onClose={handleClosePopOver} />
          )}
        </div>
        <UserIcon onClick={profileClick} />
        {modalVisible && (
          <LoginModal modalVisible={modalVisible} toggleModal={profileClick} />
        )}
        {/* {toast && <Toast icon={WarnIcon} text="인증 대기중입니다." />} */}
      </div>
    </div>
  );
}
