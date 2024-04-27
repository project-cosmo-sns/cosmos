import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { mockData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import FeedCard from '../FeedCard';
import styles from './FeedDetails.module.scss';
import { useRouter } from 'next/router';
import { FeedData } from '../FeedList/mockData';

interface FeedDetailsTypes {
  MOCKDATA: FeedData[];
}

/**
 * @return {JSX.Element} FeedDetails - 추후에 변경 예정입니다. 피드 리스트에서 특정 피드를 클릭한다면 클리한 피드의 아이디를 통해 데이터를 요청해 화면에 보여줍니다.
 */

export default function FeedDetails({ MOCKDATA }: FeedDetailsTypes) {
  const cn = classNames.bind(styles);
  const router = useRouter();
  const { query } = router;
  const { comments } = mockData[Number(query.id)];
  return (
    <div className={cn('container')}>
      <FeedCard
        feedData={MOCKDATA[Number(query.id)]}
        hasPadding={false}
        forDetails={false}
      />
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
