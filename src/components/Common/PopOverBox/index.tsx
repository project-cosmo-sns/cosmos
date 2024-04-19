import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';

/**
 * PopOver component
 * @param {React.ReactNode} children - popover안에 들어갈 내용 자식요소로 받음
 * @param {React.RefObject<HTMLDivElement>} popOverRef - 팝오버의 ref
 */

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
