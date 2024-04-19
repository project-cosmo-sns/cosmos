import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useRef } from 'react';

const cn = classNames.bind(styles);

type PopOverProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

/**
 * PopOver component
 * @param {React.ReactNode} children - popover안에 들어갈 내용 자식요소로 받음
 * @param {React.RefObject<HTMLDivElement>} popOverRef - 팝오버의 ref
 * @param {string} className - 부가적인 클래스명 (선택사항)
 */
export default function PopOver({
  children,
  className,
  onClose,
}: PopOverProps) {
  const popOverRef = useRef<HTMLDivElement>(null);
  useOutSideClick({
    ref: popOverRef,
    callback: onClose,
  });

  return (
    <div ref={popOverRef} className={cn('popOver-container', className)}>
      {children}
    </div>
  );
}
