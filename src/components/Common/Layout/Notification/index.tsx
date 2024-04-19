import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function Notification({ onClose }: PopOverProps) {
  return (
    <PopOver onClose={onClose} className={cn('notification-popover')}>
      <ul>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ul>
    </PopOver>
  );
}
