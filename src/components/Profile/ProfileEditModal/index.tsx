import Modal from '@/components/Common/Layout/Modal';
import * as Icon from '@/components/Common/IconCollection';
import ClassBadge from '@/components/Common/ClassBadge';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/mockData';
import Image from 'next/image';
import GenerationBadge from '@/components/Common/GenerationBadge';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberData: MemberDataType[];
}

const cn = classNames.bind(styles);

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
  memberData,
}: ProfileEditModalProps) {
  // currentUserId는 토큰?으로 받아옴?
  const currentUserId = '1'; // 임시 ID
  const member =
    memberData && memberData.find((user) => user.id === currentUserId);

  return (
    <div>
      {isOpen && (
        <Modal
          modalVisible={isOpen}
          toggleModal={setIsOpen}
          title="프로필 수정"
          cssComponentDisplay={cn('')}
          cssModalSize={cn('')}
        >
          <div className={cn('modal-wrapper')}>
            <div className={cn('profile-image-edit')}>
              {member ? (
                <Image
                  src={member.profile_img}
                  alt="프로필 이미지"
                  width="86"
                  height="86"
                />
              ) : (
                <Icon.ProfileIcon width="86" height="86" />
              )}
              <div className={cn('camera-image')}>
                <Icon.CameraIcon width="14" height="14" />
              </div>
            </div>
            <div className={cn('name')}>{member?.nickname}</div>
            <GenerationBadge generationInfo={member?.generation} />
            <div className={cn('introduce')}>
              {member?.introduce ? (
                <textarea
                  defaultValue={member.introduce}
                  autoComplete="on"
                  className={cn('textarea', {
                    textareaActive: member?.introduce,
                  })}
                />
              ) : (
                <textarea placeholder="한줄소개를 입력하세요 (?자제한)" />
              )}
            </div>
            <div className={cn('flex-grow-div')}> </div>
            <div className={cn('edit-button')}>
              <DefaultButton
                onClick={() => {
                  console.log('수정하기클릭');
                }}
                buttonType="submit"
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
