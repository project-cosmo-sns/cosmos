import fetchData from '@/api/fetchData';
import PopOver from '@/components/Common/PopOverBox';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { BackIcon, SettingIcon } from '../../IconCollection';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';
import NotificationModal from './NotificationModal';
import { NotificationResult } from './type';

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
    isSuccess,
  } = useInfiniteScroll<NotificationResult>({
    queryKey: ['notification'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `/notification/list?order=DESC&page=${pageParam}&take=10`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const notificationList = notificationListData?.pages ?? [];

  return (
    <>
      {!isLoading && isSuccess && (
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
          <>
            {notificationList.map((notification) =>
              notification.data.map((notificationitem) => (
                <NotificationItem
                  key={notificationitem.notification.id}
                  data={notificationitem}
                  handleClosePopOver={onClose}
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
        </PopOver>
      )}
    </>
  );
}
