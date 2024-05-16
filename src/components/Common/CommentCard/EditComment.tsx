import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import styles from './EditComment.module.scss';
import { EditCommentType } from '@/@types/type';
import DefaultButton from '../Buttons/DefaultButton';

const cn = classNames.bind(styles);

export default function EditComment({
  content,
  onSubmit,
}: {
  content: string;
  onSubmit: (data: EditCommentType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCommentType>();
  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('textarea-wrapper')}>
        <textarea
          className={cn('textarea')}
          defaultValue={content}
          {...register('editedComment', {
            required: '댓글을 입력해주세요',
            maxLength: {
              value: 310,
              message: '300자 이하로 작성해주세요.',
            },
            validate: {
              whiteSpace: (value) => !!value.trim() || '댓글을 입력해주세요',
            },
          })}
        />
        {errors.editedComment && (
          <span className={cn('error')}>
            {errors.editedComment.message?.toString()}
          </span>
        )}
      </div>
      <DefaultButton buttonType="submit" size="small" color="purple">
        수정
      </DefaultButton>
    </form>
  );
}
