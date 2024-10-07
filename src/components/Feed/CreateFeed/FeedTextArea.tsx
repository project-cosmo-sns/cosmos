import classNames from 'classnames/bind';
import styles from './CreateFeed.module.scss';
import { FeedTextAreaTypes } from './type';

const cn = classNames.bind(styles);

export default function FeedTextArea({
  errors,
  register,
  watch,
}: FeedTextAreaTypes) {
  return (
    <>
      <textarea
        className={cn('text', { 'error-border': errors.content })}
        rows={5}
        maxLength={350}
        placeholder="글을 작성해주세요"
        {...register('content', {
          required: '게시글을 작성해주세요',
          minLength: {
            value: 1,
            message: '게시글을 작성해 주세요.',
          },
          maxLength: {
            value: 300,
            message: '최대 300자 까지 작성 가능합니다.',
          },
          validate: {
            whiteSpace: (value) => !!value.trim() || '게시글을 작성 해주세요.',
          },
        })}
      />
      {errors.content && (
        <span className={cn('error')}>
          {errors.content.message?.toString()}
        </span>
      )}
      <span className={cn('limit', { warn: watch('content').length > 300 })}>
        {watch('content') && watch('content').length}/300
      </span>
    </>
  );
}
