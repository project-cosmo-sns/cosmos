import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import * as Icon from '@/components/Common/IconCollection/index';
import ModalPortal from './ModalPortal';

interface ModalType {
  children: ReactNode;
  title?: string;
  modalVisible: boolean;
  toggleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  cssModalSize: string;
  cssComponentDisplay: string;
  className?: string;
}

const cn = classNames.bind(styles);

/**
 * 모달 레이아웃 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {ReactNode} props.children - 모달안에 들어갈 컴포넌트
 * @param {string} props.title - 모달 제목
 * @param {boolean} props.modalVisible - 상위 컴포넌트의 모달 on/off 여부 변수
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.toggleModal - X 아이콘 클릭시 모달을 닫아주기 위한 setState 함수
 * @param {string} props.cssModalSize - Modal 컴포넌트의 상위 컴포넌트에서 className={cn('example01')} 을 추가하여 모달 사이즈를 설정
 * @param {string} props.cssComponentDisplay - Modal 컴포넌트의 상위 컴포넌트에서 className={cn('example01')} 을 추가하여 모달 내부 컴포넌트의 위치 설정
 * @returns {JSX.Element} 모달 레이아웃 JSX
 */

export default function Modal({
  children,
  title,
  toggleModal,
  modalVisible,
  cssModalSize,
  cssComponentDisplay,
  className,
}: ModalType) {
  return (
    <div className="Modal">
      {modalVisible && (
        <ModalPortal>
          <div className={cn('container', className)}>
            <div
              role="presentation"
              onClick={() => toggleModal && toggleModal(!modalVisible)}
            >
              <Icon.XIcon
                className={cn('x')}
                width="18"
                height="18"
                onClick={() => {
                  toggleModal && toggleModal(!modalVisible);
                }}
              />
            </div>
            <div className={cn(cssModalSize)}>
              <div className={cn('wrapper')}>
                {title && (
                  <div className={cn('title')}>
                    <span>{title}</span>
                  </div>
                )}
                <div className={cn('component', cssComponentDisplay)}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
