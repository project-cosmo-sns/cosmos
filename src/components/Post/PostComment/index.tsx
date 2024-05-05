import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { CommentListType } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';
import { useRouter } from 'next/router';

interface PostCommentProps {
  commentData: CommentListType;
}

const cn = classNames.bind(styles);

export default function PostComment({ commentData }: PostCommentProps) {
  const { data } = commentData;
  const router = useRouter();
  const { postId } = router.query;
  const { totalCount } = commentData.meta;

  return (
    <div className={cn('wrapper')}>
      {/* <CommentInput placeholder="댓글을 입력하세요" feedId={Number(postId)} /> */}
      <div className={cn('comment-container')}>
        {data.map((comment, index) => (
          <div key={comment.comment.id}>
            <CommentCard comment={comment} />
            {index === data.length - 1 || <div className={cn('divide-line')} />}
          </div>
        ))}
      </div>
    </div>
  );
}
