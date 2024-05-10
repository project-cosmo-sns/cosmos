import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';
import { BackIcon, SettingIcon } from '../../IconCollection';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useState } from 'react';
import NotificationModal from './NotificationModal';
import { NotificationResult } from './type';
import fetchData from '@/api/fetchData';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function Notification({ onClose }: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notificationListData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<NotificationResult>({
    queryKey: ['notification'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `/notification/list?order=DESC&page=${pageParam}&take=10`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  console.log(notificationListData);

  const notificationList = notificationListData?.pages ?? [];

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

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {notificationList.map((notification) =>
            notification.data.map((notificationitem) => (
              <NotificationItem
                key={notificationitem.notification.id}
                data={notificationitem}
              />
            )),
          )}
          {!isFetchingNextPage && <div ref={ref} />}
          {isModalOpen && (
            <NotificationModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
            />
          )}
        </>
      )}
    </PopOver>
  );
}
