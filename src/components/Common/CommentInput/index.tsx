import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import DefaultButton from '../Buttons/DefaultButton';
import styles from './CommentInput.module.scss';
// eslint-disable-next-line import/no-cycle
import { useCommentRequest } from '@/hooks/useCommentRequest';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { CommentListType } from '@/components/Feed/types';

export interface Comment {
  comment: string;
}

interface CommentInputTypes {
  placeholder: string;
  feedId: number;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<CommentListType, Error>>;
}

const cn = classNames.bind(styles);

export default function CommentInput({
  placeholder,
  feedId,
  refetch,
}: CommentInputTypes) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Comment>({
    defaultValues: {
      comment: '',
    },
  });

  const { postCommentMutate } = useCommentRequest(feedId, true, refetch);

  const onSubmit = async (data: Comment) => {
    postCommentMutate(data);
    reset();
  };

  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('textarea-wrapper')}>
        <textarea
          className={cn('textarea')}
          placeholder={placeholder}
          {...register('comment', { required: true, maxLength: 300 })}
        />
      </div>
      <DefaultButton
        disabled={isSubmitting}
        buttonType="submit"
        size="small"
        color="purple"
      >
        등록
      </DefaultButton>
    </form>
  );
}
