import styles from './SideContent.module.scss';
import classNames from 'classnames/bind';
import { LeftIcon, RightIcon } from '../../IconCollection';

const cn = classNames.bind(styles);

type SideContentProps = {
  text: string;
  children: React.ReactNode;
};

function SideContent({ text, children }: SideContentProps) {
  return (
    <div className={cn('sideContent-container')}>
      <div className={cn('sideContent-header')}>
        <h1>{text}</h1>
        <div>
          <LeftIcon />
          <RightIcon />
        </div>
      </div>
      <div className={cn('sideContent-Main')}>{children}</div>
    </div>
  );
}

export default SideContent;
