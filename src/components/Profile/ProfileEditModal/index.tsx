import Modal from '@/components/Common/Layout/Modal';
import * as Icon from '@/components/Common/IconCollection';
import ClassBadge from '@/components/Common/ClassBadge';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const cn = classNames.bind(styles);

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
}: ProfileEditModalProps) {
  return (
    <>
      {isOpen && (
        <Modal
          currentValue={isOpen}
          handleClick={setIsOpen}
          title="프로필 수정"
        >
          <div
            style={{
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <Icon.XIcon width="18" height="18" />
              프로필 수정
              <Icon.ProfileIcon width="86" height="86" />
              <Icon.CameraIcon width="28" height="28" />
              이름
              <ClassBadge />
              한줄소개
              <textarea>한줄소개를 입력하세요(?자제한)</textarea>{' '}
              <div className={cn('edit-button')}>
                <DefaultButton
                  onClick={() => {
                    console.log('수정하기클릭');
                  }}
                  size="modal"
                  color="$primary-01"
                >
                  수정하기
                </DefaultButton>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
