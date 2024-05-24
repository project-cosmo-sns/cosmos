import SideContent from '../index';
import styles from './HotPost.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function HotPost() {
  return (
    <SideContent text="🔥인기 포스트🔥">
      <div className={cn('HotPost-container')}>
        <span>1</span>
        <span> 배드민턴 칠 사람 ~ 🏸</span>
      </div>
    </SideContent>
  );
}
