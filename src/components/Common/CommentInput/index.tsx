import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import DefaultButton from '../Buttons/DefaultButton';
import styles from './CommentInput.module.scss';
import { InfiniteDataRefetchType } from '@/@types/type';
import { CommentListType } from '@/components/Feed/types';

export interface Comment {
  comment: string;
}

interface CommentInputTypes {
  placeholder?: string;
  mutateFn: (data: string) => void;
  refetch: InfiniteDataRefetchType<CommentListType>;
}

const cn = classNames.bind(styles);

export default function CommentInput({
  placeholder = '댓글을 입력하세요',
  mutateFn,
  refetch,
}: CommentInputTypes) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (data: Comment) => {
    mutateFn(data.comment);
    reset();
  };

  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('textarea-wrapper')}>
        <textarea
          className={cn('textarea')}
          placeholder={placeholder}
          {...register('comment', {
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
        {errors.comment && (
          <span className={cn('error')}>
            {errors.comment.message?.toString()}
          </span>
        )}
      </div>
      <DefaultButton buttonType="submit" size="small" color="black-01">
        등록
      </DefaultButton>
    </form>
  );
}
