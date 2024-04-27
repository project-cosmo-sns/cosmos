import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { PostData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';

interface PostCommentProps {
  postData: PostData;
}

const cn = classNames.bind(styles);

export default function PostComment({ postData }: PostCommentProps) {
  const { comments } = postData;

  return (
    <div className={cn('wrapper')}>
      <CommentInput
        placeholder="댓글을 입력하세요"
        handleClick={() => console.log('댓글 등록')}
      />
      <div className={cn('comment-container')}>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            {index === comments.length - 1 || (
              <div className={cn('divide-line')} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
