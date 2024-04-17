import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type PopOverProps = {
  children: React.ReactNode;
};

export default function PopOver({ children }: PopOverProps) {
  return <div className={cn('container')}>{children}</div>;
}
