import Modal from '@/components/Common/Layout/Modal';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/mockData';
import GenerationBadge from '@/components/Common/GenerationBadge';
import ImageInput from '@/components/Common/ImageInput';
import { AuthFormProps, ModalPropsType } from '@/@types/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberData: MemberDataType;
}

const cn = classNames.bind(styles);

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
  memberData,
}: ProfileEditModalProps) {
  const [previewImage, setPreviewImage] = useState('');
  const { register, handleSubmit, watch } = useForm<AuthFormProps>();

  const onSubmit: SubmitHandler<AuthFormProps> = (data) => console.log(data);

  useEffect(() => {
    if (memberData && memberData.profileImageUrl) {
      setPreviewImage(memberData.profileImageUrl);
    }
  }, [memberData]);

  // 이미지 업로드 가능 시 넣을 코드 임시로
  // useEffect(() => {
  //   if (profileImage && profileImage.length > 0) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       setPreviewImage(fileReader.result.toString());
  //     };
  //     fileReader.readAsDataURL(profileImage[0]);
  //   }
  // }, [profileImage]);

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
                initialImageUrl={previewImage}
              />
            </div>
            <div className={cn('name')}>{memberData?.nickname}</div>
            <GenerationBadge
              generationInfo={memberData?.generation}
              isAuthorized={memberData?.isAuthorized}
            />
            <div className={cn('introduce')}>
              한줄소개
              {memberData?.introduce ? (
                <textarea
                  defaultValue={memberData.introduce}
                  autoComplete="on"
                  className={cn('textarea', {
                    textareaActive: memberData?.introduce,
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
