import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { mockData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import FeedCard from '../FeedCard';
import { MOCKDATA2 } from '../FeedCardList/mockData';
import styles from './FeedDetails.module.scss';

export default function FeedDetails() {
  const cn = classNames.bind(styles);
  const { comments } = mockData[0];
  return (
    <div className={cn('container')}>
      <FeedCard feedData={MOCKDATA2[0]} hasPadding={false} />
      <CommentInput
        placeholder="댓글을 입력하세요"
        handleClick={() => console.log('등록')}
      />
      <div>
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
