import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import * as Icon from '@/components/Common/IconCollection/index';

const cn = classNames.bind(styles);

/**
 * 모달 레이웃 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {ReactNode} props.children - 모달안에 들어갈 컴포넌트
 * @param {string} props.title - 모달 제목
 * @param {boolean} props.currentValue - 상위 컴포넌트의 모달 on/off 여부 변수
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.handleClick - X 아이콘 클릭시 모달을 닫아주기 위한 setState 함수
 * @returns {JSX.Element} 모달 레이아웃 JSX
 */

interface ModalType {
  children: ReactNode;
  title: string;
  currentValue: boolean;
  handleClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  children,
  title,
  handleClick,
  currentValue,
}: ModalType) {
  return (
    <div className={cn('modal-layout-container')}>
      <div className={cn('modal-layout-wrapper')}>
        <div role="presentation" onClick={() => handleClick(!currentValue)}>
          <Icon.XIcon className={cn('modal-layout-x')} width="18" height="18" />
        </div>
        <span className={cn('modal-layout-title')}>{title}</span>
        <div className={cn('modal-layout-component')}>{children}</div>
      </div>
    </div>
  );
}
