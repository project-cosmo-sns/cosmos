import PopOver from '@/components/Common/PopOverBox';
import NotificationItem from './NotificationItem';

type PopOverProps = {
  popOverRef: React.RefObject<HTMLDivElement>;
};

export default function Notification({ popOverRef }: PopOverProps) {
  // 예상 데이터...를 잘 모르겠음.
  return (
    <PopOver popOverRef={popOverRef}>
      <ul>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ul>
    </PopOver>
  );
}
