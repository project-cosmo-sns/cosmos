import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type PopOverProps = {
  children: React.ReactNode;
  popOverRef: React.RefObject<HTMLDivElement>;
};

export default function PopOver({ children, popOverRef }: PopOverProps) {
  return (
    <div ref={popOverRef} className={cn('popOver-container')}>
      {children}
    </div>
  );
}
