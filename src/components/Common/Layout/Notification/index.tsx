import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';
import { BackIcon, SettingIcon } from '../../IconCollection';
import { useState } from 'react';
import NotificationModal from './NotificationModal';
import { NotificationResult } from './type';
import { useQuery } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function Notification({ onClose }: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notification,
    isLoading,
    isSuccess,
  } = useQuery<NotificationResult>({
    queryKey: ['notification'],
    queryFn: () =>
      fetchData({
        param: `/notification/list?order=DESC&page=1&take=10`,
      }),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isSuccess || !notification.data || notification.data.length === 0) {
    return <div>알림이 없습니다.</div>;
  }

  return (
    <PopOver onClose={onClose} className={cn('notification-popover')}>
      <BackIcon
        className={cn('notification-close')}
        width="18"
        height="18"
        onClick={onClose}
      />
      <h2>알림</h2>
      <SettingIcon
        className={cn('setting-icon')}
        onClick={() => setIsModalOpen(true)}
        fill="#C2C7D9"
      />

      {notification.data.map((notificationitem) => (
        <NotificationItem
          key={notificationitem.notification.id}
          data={notificationitem}
        />
      ))}

      {isModalOpen && (
        <NotificationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </PopOver>
  );
}
