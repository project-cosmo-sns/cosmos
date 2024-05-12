import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import Notification from '@/components/Common/Layout/Notification';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
  ProfileIconDark,
} from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import { useGetProfileImage } from '@/api/member';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { login } from '@/redux/logoutSlice';
import { openLoginModal } from '@/redux/loginModalSlice';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [activePopover, setActivePopover] = useState<'add' | 'bell' | null>(
    null,
  );
  const [userImage, setUserImage] = useState<string | null>(null);

  const router = useRouter();
  const isLogin = useSelector((state: RootState) => state.logout.isLoggedIn);

  const dispatch = useDispatch();

  const profileClick = () => {
    if (isLogin) {
      router.push('/profile');
      return;
    }
    dispatch(openLoginModal());
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

  const { data: userProfileImage } = useGetProfileImage();

  useEffect(() => {
    if (!userProfileImage) return;
    setUserImage(userProfileImage?.profileImageUrl);
    dispatch(login());
  }, [userProfileImage]);

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <HomeIcon fill="#FFFFFF" />
        </Link>
        <div
          className={cn('icon-box', 'add-icon')}
          onClick={(e) => togglePopOver(e, 'add')}
        >
          <AddIcon fill="#9747FF" />
          {activePopover === 'add' && (
            <AddContentPopOver
              profileImage={userImage}
              onClose={handleClosePopOver}
            />
          )}
        </div>
        <div
          className={cn('icon-box')}
          onClick={(e) => togglePopOver(e, 'bell')}
        >
          <BellIcon fill="#FFFFFF" />
          {activePopover === 'bell' && (
            <Notification onClose={handleClosePopOver} />
          )}
        </div>
        {!isLogin && <UserIcon fill="#FFFFFF" onClick={profileClick} />}
        {isLogin && userImage && (
          <Image
            src={userImage}
            alt="profile"
            width={27}
            height={27}
            onClick={profileClick}
          />
        )}
        {isLogin && !userImage && <ProfileIconDark onClick={profileClick} />}
      </div>
    </div>
  );
}
