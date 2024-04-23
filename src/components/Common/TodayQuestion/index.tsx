import { useState } from 'react';
import { UpIcon, DownIcon } from '../IconCollection';
import styles from './TodayQuestion.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function TodayQuestion() {
  const [isToggled, setIsToggled] = useState(true);

  const toggleIcon = () => {
    setIsToggled((prevState) => !prevState);
  };

  const iconToShow = isToggled ? (
    <DownIcon fill="black" width="18" height="18" />
  ) : (
    <UpIcon fill="black" width="18" height="18" />
  );

  return (
    <div className={cn('question-container', { toggled: isToggled })}>
      <div className={cn('question-title')}>
        <strong>오늘의 질문</strong>
        <div className={cn('toggle-icon')} onClick={toggleIcon}>
          {iconToShow}
        </div>
      </div>
      <h3 className={cn('question-text', { hidden: !isToggled })}>
        질문내용? 여러분들 잘 작업하고 계신가요? 힘냅시당...
      </h3>
    </div>
  );
}
