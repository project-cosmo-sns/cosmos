import { ModalPropsType, AuthFormProps } from '@/@types/type';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ImageInput from '@/components/Common/ImageInput';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Layout/Modal';
import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { generationRegex, nameRegex } from '@/constants/generationRegex';
import { useToast } from '@/hooks/useToast';
import { useSendAuthData, s3UploadImage } from '@/api/authorization';
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function AuthForm({
  modalVisible,
  toggleModal,
}: ModalPropsType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormProps>();

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const router = useRouter();
  const { showToastHandler } = useToast();
  const sendAuth = useSendAuthData();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImage = await s3UploadImage(file);
      if (uploadedImage) {
        setUploadedImageUrl(uploadedImage);
      }
    }
  };

  const onSubmit: SubmitHandler<AuthFormProps> = async (data) => {
    try {
      await sendAuth({
        generation: Number(data.generation),
        name: data.name,
        image: uploadedImageUrl,
      });
      showToastHandler('인증 신청이 완료되었습니다.', 'check');
      router.push('/?tab=feed');
    } catch (error) {
      console.error('인증 신청 에러: ', error);
    }
  };

  const modalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={cn('modal-content')} onClick={modalContentClick}>
      <Modal
        title="스프린터 인증"
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        cssModalSize={cn('auth-container')}
        cssComponentDisplay={cn('auth-wrapper')}
      >
        <form className={cn('auth-Form')} onSubmit={handleSubmit(onSubmit)}>
          <div className={cn('auth-name')}>
            <h2>이름</h2>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요. ex) 코스모"
              register={{
                ...register('name', {
                  required: '이름을 입력해주세요',
                  pattern: {
                    value: nameRegex,
                    message: '한글만 입력해 주세요',
                  },
                }),
              }}
            />
            {errors.name && <small>{errors.name.message}</small>}
          </div>
          <div className={cn('auth-generation')}>
            <h2>기수</h2>
            <Input
              id="generation"
              type="text"
              placeholder="기수를 입력하세요. ex) 3"
              register={{
                ...register('generation', {
                  required: '기수를 입력해 주세요.',
                  pattern: {
                    value: generationRegex,
                    message: '숫자만 입력해 주세요.',
                  },
                }),
              }}
            />
            {errors.generation && <small>{errors.generation.message}</small>}
          </div>
          <div className={cn('auth-image')}>
            <h2>스프린터 인증</h2>
            <span>코드잇 프로필 페이지 또는 수료증을 업로드해 주세요</span>
            <ImageInput
              type="certify"
              watch={watch}
              register={{
                ...register('image', {
                  required: '이미지를 업로드해 주세요',
                  onChange: (e) => {
                    handleImageChange(e);
                  },
                }),
              }}
            />
            {errors.image && <small>{errors.image.message}</small>}
          </div>
          <DefaultButton
            buttonType="button"
            size="modal"
            color="primary-01"
            onClick={handleSubmit(onSubmit)}
          >
            신청하기
          </DefaultButton>
        </form>
      </Modal>
    </div>
  );
}
