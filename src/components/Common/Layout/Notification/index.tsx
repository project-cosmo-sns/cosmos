import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';
import { SettingIcon } from '../../IconCollection';
import { useState } from 'react';
import NotificationModal from './NotificationModal';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function Notification({ onClose }: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockData = [
    {
      id: 1,
      author: {
        id: '아이디',
        nickname: '닉네임',
        profileImage: null,
      },
      text: '무슨 텍스트가 올까요...?',
      createdAt: '2시간 전',
      isRead: false,
    },
    {
      id: 2,
      author: {
        id: '아이디',
        nickname: '닉네임',
        profileImage: null,
      },
      text: '무슨 텍스트가 올까요...?',
      createdAt: '2시간 전',
      isRead: false,
    },
    {
      id: 3,
      author: {
        id: '아이디',
        nickname: '닉네임',
        profileImage: null,
      },
      text: '무슨 텍스트가 올까요...?',
      createdAt: '2시간 전',
      isRead: false,
    },
    {
      id: 4,
      author: {
        id: '아이디',
        nickname: '닉네임',
        profileImage: null,
      },
      text: '무슨 텍스트가 올까요...?',
      createdAt: '2시간 전',
      isRead: false,
    },
    {
      id: 5,
      author: {
        id: '아이디',
        nickname: '닉네임',
        profileImage: null,
      },
      text: '무슨 텍스트가 올까요...?',
      createdAt: '2시간 전',
      isRead: true,
    },
  ];

  return (
    <PopOver onClose={onClose} className={cn('notification-popover')}>
      <h2>알림</h2>
      <SettingIcon
        className={cn('setting-icon')}
        onClick={() => setIsModalOpen(true)}
      />

      {mockData.map((notification) => (
        <NotificationItem key={notification.id} data={notification} />
      ))}
      {isModalOpen && (
        <NotificationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </PopOver>
  );
}
