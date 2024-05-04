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
  ProfileIcon,
} from '@/components/Common/IconCollection';
import LoginModal from '../../LoginModal';
import { useRouter } from 'next/router';
import getProfileImage from '@/api/ProfileImage';
import Image, { StaticImageData } from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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
  const [userImage, setUserImage] = useState<string | null>(null);

  const router = useRouter();

  const profileClick = () => {
    if (userImage) {
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

  const { data } = useQuery({
    queryKey: ['profileImage'],
    queryFn: getProfileImage,
  });

  console.log(userImage);

  useEffect(() => {
    setUserImage(data ?? null);
  }, [data]);

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
            <AddContentPopOver onClose={handleClosePopOver} />
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
        {userImage ? (
          <Image
            src={userImage}
            alt="profile"
            width={27}
            height={27}
            onClick={profileClick}
          />
        ) : (
          <UserIcon fill="#FFFFFF" onClick={profileClick} />
        )}
      </div>
      <LoginModal modalVisible={modalVisible} toggleModal={profileClick} />
    </div>
  );
}

// 로그인 여부는 프로필 아이콘이 바뀌는 것으로, 
// 로그인이 안되어있을 때 사람모양 아이콘이었다가.
// 로그인이 되어있을 때 userImage null이면 사람모양 아이콘, 아니면 프로필 이미지
