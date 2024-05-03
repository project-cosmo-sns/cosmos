import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import classNames from 'classnames/bind';
import FeedCard from '../FeedCard';
import styles from './FeedDetails.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFeedCommentList, getFeedDetails } from './api';

/**
 * @return {JSX.Element} FeedDetails - 추후에 변경 예정입니다. 피드 리스트에서 특정 피드를 클릭한다면 클리한 피드의 아이디를 통해 데이터를 요청해 화면에 보여줍니다.
 */

export default function FeedDetails() {
  const cn = classNames.bind(styles);
  const [feed, setFeed] = useState({
    writer: {},
    feed: {},
  });
  const [commentList, setCommentList] = useState([]);
  const router = useRouter();
  const { query } = router;
  const feedId: number = Number(query.feedId);

  useEffect(() => {
    const fetchFeedDetails = async () => {
      const feedDetails = await getFeedDetails(feedId);
      setFeed(feedDetails);
    };
    const fetchFeedComments = async () => {
      const feedComments = await getFeedCommentList(feedId);
      setCommentList(feedComments);
    };

    fetchFeedDetails();
    fetchFeedComments();
  }, []);

  return (
    <div className={cn('container')}>
      <FeedCard feedData={feed} hasPadding={false} forDetails />
      <CommentInput
        placeholder="댓글을 입력하세요"
        handleClick={() => console.log('등록')}
      />
      {commentList.length ? (
        commentList.map((comment, index) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            {index === commentList.length - 1 || (
              <div className={cn('divide-line')} />
            )}
          </div>
        ))
      ) : (
        <div className={cn('empty-comment')}>
          <span className={cn('message')}>
            😭 {feed.writer.nickname} 님에게 남겨진 댓글이 아직 없어요. 😭
          </span>
        </div>
      )}
    </div>
  );
}
