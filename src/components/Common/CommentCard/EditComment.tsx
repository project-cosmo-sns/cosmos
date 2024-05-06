// 댓글 수정창 디자인 없어서 임시로 만들어둠. 추후 수정예정
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import styles from './EditComment.module.scss';

const cn = classNames.bind(styles);

export interface CommentEdit {
  editedComment: string;
}

export default function EditComment({
  content,
  onSubmit,
}: {
  content: string;
  onSubmit: () => void;
}) {
  const { register, handleSubmit } = useForm<CommentEdit>();
  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <textarea defaultValue={content} {...register('editedComment')} />
      <button type="submit" className={cn('edit-button')}>
        수정
      </button>
    </form>
  );
}
