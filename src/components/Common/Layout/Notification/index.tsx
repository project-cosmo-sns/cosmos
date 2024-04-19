import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';

export default function Notification() {
  // 예상 데이터...를 잘 모르겠음.
  return (
    <PopOver>
      <ul>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ul>
    </PopOver>
  );
}
