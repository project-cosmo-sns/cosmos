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
    data: notificationList,
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

  if (
    !isSuccess ||
    !notificationList.data ||
    notificationList.data.length === 0
  ) {
    return <div>알림이 없습니다.</div>;
  }

  // 알림... 팝오버를 켰을때 보이는 알림들을 리스트 뽑아서 한꺼번에 읽음 처리 하고 싶은데 하나씩 보내게 되어있음. 고민좀 해봐야 할듯... 하나씩 읽음 처리 한다면 읽음 버튼이 있어야 하지 않을까?
  // 본인 알림 목록에 isConfirmed이 false인게 1개라도 있으면 알림쪽에 dot 표시도 해야하는데. 이것도 고민좀하고 적용해야됨.
  const notificationIds = notificationList.data.map(
    (item) => item.notification.id,
  );

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

      {notificationList.data.map((notificationitem) => (
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
