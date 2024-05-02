import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

const cn = classNames.bind(styles);

type PopOverProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

/**
 * PopOver component
 * @param {React.ReactNode} children - popover안에 들어갈 내용 자식요소로 받음
 * @param {string} className - 부가적인 클래스명 (선택사항)
 * @param {() => void} onClose - 팝오버를 닫는 함수
 */
export default function PopOver({
  children,
  className,
  onClose,
}: PopOverProps) {
  const popOverRef = useRef<HTMLDivElement>(null);
  const portalContainer = document.getElementById('popover-root');

  useOutSideClick({
    ref: popOverRef,
    callback: onClose,
  });

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!portalContainer) return null;

  return ReactDOM.createPortal(
    <div
      ref={popOverRef}
      className={cn('popOver-container', className)}
      onClick={handleInnerClick}
    >
      {children}
    </div>,
    portalContainer,
  );
}
