import styles from './TodayQuestion.module.scss';
import classNames from 'classnames/bind';
import { WarnIcon } from '../IconCollection';

export default function Unauthorized() {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('unauthorized-content')}>
      <WarnIcon fill="#fff" />
      <p>
        현재 미인증 상태입니다. 일부 컨텐츠를 제외한 대부분의 컨텐츠가 제한된
        상태입니다.
      </p>
    </div>
  );
}
