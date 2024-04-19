import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { ProfileIcon } from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);

// 알림 오는 텍스트 분류 : 게시물 반응 / 팔로우 / 댓글
export default function NotificationItem() {
  return (
    <li className={cn('notification-item')}>
      <ProfileIcon />
      <p>
        (멤버이름)님이 회원님의 피드에 반응을 남겼습니다. <span>시간표시</span>
      </p>
    </li>
  );
}
