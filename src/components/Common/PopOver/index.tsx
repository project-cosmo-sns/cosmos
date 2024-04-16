import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function PopOver() {
  return (
    <ul className={cn('container')}>
      <li>피드 작성</li>
      <li>포스트 작성</li>
    </ul>
  );
}
