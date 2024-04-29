import Modal from '@/components/Common/Layout/Modal';
import * as Icon from '@/components/Common/IconCollection';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/mockData';
import Image from 'next/image';
import GenerationBadge from '@/components/Common/GenerationBadge';
import ImageInput from '@/components/Common/ImageInput';
import { AuthFormProps, ModalPropsType } from '@/@types/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

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
  const { register, handleSubmit, watch, setValue } = useForm<AuthFormProps>();

  const onSubmit: SubmitHandler<AuthFormProps> = (data) => console.log(data);

  const member =
    memberData && memberData.find((user) => user.id === currentUserId);

  useEffect(() => {
    if (member) {
      setValue('image', member.imageUrl);
    }
  }, [member, setValue]);

  return (
    <div>
      {isOpen && (
        <Modal
          modalVisible={isOpen}
          toggleModal={setIsOpen}
          title="프로필 수정"
          cssComponentDisplay={cn('profile-edit-modal')}
          cssModalSize={cn('380px')}
        >
          <form
            className={cn('profile-edit-Form')}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={cn('profile-image-edit')}>
              <ImageInput
                type="profile"
                watch={watch}
                register={register('image')}
              />
              {/* {member ? (
               설정한프로필이미지출력
              ) : (
                <Image
                  src={member.profile_img}
                  alt="프로필 이미지"
                  width="86"
                  height="86"
                />
                <Icon.ProfileIcon width="86" height="86" />
              )}
              <div className={cn('camera-image')}>
                <Icon.CameraIcon width="14" height="14" />
              </div> */}
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
          </form>
        </Modal>
      )}
    </div>
  );
}
