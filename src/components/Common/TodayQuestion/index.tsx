import styles from './TodayQuestion.module.scss';
import classNames from 'classnames/bind';
import { RightIcon } from '../IconCollection';

const cn = classNames.bind(styles);

export default function TodayQuestion() {
  return (
    <div className={cn('question-container')}>
      <div className={cn('question-title')}>
        <strong>오늘의 질문</strong>
        <RightIcon fill="#fff" className={cn('viewmore-icon')} />
      </div>
      <h3 className={cn('question-text')}>
        코드잇 스프린터 여러분들의 꽃길을 응원합니다 🌸
      </h3>
    </div>
  );
}
