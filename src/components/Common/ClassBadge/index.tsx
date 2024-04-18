import styles from './ClassBadge.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function ClassBadge() {
  return (
    <div className={cn('class-badge')}>
      {/* {'회원임?' ? '3기' : '대기중'} */}
      3기
    </div>
  );
}
