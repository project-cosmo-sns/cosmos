import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';

type PopOverProps = {
  onClose: () => void;
};

export default function Notification({ onClose }: PopOverProps) {
  return (
    <PopOver onClose={onClose}>
      <ul>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ul>
    </PopOver>
  );
}
