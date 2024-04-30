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
import LoginModal from '../../LoginModal';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);
/**
 * 프로필 이미지에 로그인 모달 연결했습니다. 로그인 모달은 로그인이 안되어있을 때만 뜨도록 설정했습니다.
 * 로그인하면 브라우저에 저장되는 쿠키가 암호화 되어있어서 브라우저에서 확인할 수 없습니다
 * 그래서 멘토님이 로그인 여부 확인하는 api만들어주신다 하셨고
 * 일단은 예비로 로컬스토리지에 토큰을 수동으로 입력해서 로그인 여부 확인하는 방법으로 설정했습니다.
 * @returns
 */

export default function SideBar() {
  const [activePopover, setActivePopover] = useState<'add' | 'bell' | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const getToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const profileClick = () => {
    if (getToken) {
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
      </div>
    </div>
  );
}
