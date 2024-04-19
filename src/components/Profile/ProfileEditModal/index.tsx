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
    <div>
      {isOpen && (
        <Modal
          currentValue={isOpen}
          handleClick={setIsOpen}
          title="프로필 수정"
        >
          <div className={cn('modal-wrapper')}>
            <div className={cn('profile-image-edit')}>
              <Icon.ProfileIcon
                width="86"
                height="86"
                className={cn('profile-image')}
              />
              <div className={cn('camera-image')}>
                <Icon.CameraIcon width="14" height="14" />
              </div>
            </div>
            <div className={cn('name')}>이름</div>
            <ClassBadge />
            <div className={cn('introduce')}>
              한줄소개
              <textarea placeholder="한줄소개를 입력하세요 (?자제한)" />{' '}
            </div>
            <div className={cn('flex-grow-div')}> </div>
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
        </Modal>
      )}
    </div>
  );
}
