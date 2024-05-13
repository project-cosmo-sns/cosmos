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
  const { register, handleSubmit } = useForm<EditCommentType>();
  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <textarea defaultValue={content} {...register('editedComment')} />
      <DefaultButton buttonType="submit" size="small" color="purple">
        수정
      </DefaultButton>
    </form>
  );
}
