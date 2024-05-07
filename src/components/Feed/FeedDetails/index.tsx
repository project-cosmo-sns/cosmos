import CommentCard from '@/components/Common/CommentCard';
import CommentInput, { Comment } from '@/components/Common/CommentInput';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import FeedCard from '@/components/Feed/FeedCard/index';
import { getFeedCommentList } from '@/components/Feed/FeedDetails/api';
import { postComment } from '@/components/Common/CommentInput/api';
import fetchData from '@/api/fetchData';
import styles from './FeedDetails.module.scss';
import { FeedDetailType, CommentDetailType, CommentListType } from '../types';

/**
 * @return {JSX.Element} FeedDetails - 추후에 변경 예정입니다. 피드 리스트에서 특정 피드를 클릭한다면 클리한 피드의 아이디를 통해 데이터를 요청해 화면에 보여줍니다.
 */

export default function FeedDetails({ feedId }: { feedId: number }) {
  const cn = classNames.bind(styles);
  const [feed, setFeed] = useState<FeedDetailType>({
    writer: {
      id: 0,
      nickname: '',
      generation: 0,
      profileImageUrl: '',
    },
    feed: {
      id: 0,
      content: '',
      viewCount: 0,
      commentCount: 0,
      emojiCount: 0,
      createdAt: '',
      imageUrls: [],
      isMine: false,
    },
  });
  const [commentList, setCommentList] = useState<CommentDetailType[]>([]);

  useEffect(() => {
    const fetchFeedDetails = async () => {
      const feedDetails = await fetchData<FeedDetailType>({
        param: `feed/${feedId}/detail`,
      });
      setFeed(feedDetails);
    };
    const fetchFeedComments = async () => {
      const feedComments = await fetchData<CommentListType>({
        param: `feed/${feedId}/comment/list`,
      });
      setCommentList(feedComments.data);
    };

    fetchFeedDetails();
    fetchFeedComments();
  }, []);

  const onSubmit = (data: Comment) => {
    postComment(data, feedId);
  };

  return (
    <div className={cn('container')}>
      <FeedCard feedData={feed} hasPadding={false} forDetails />
      <CommentInput placeholder="댓글을 입력하세요" onSubmit={onSubmit} />
      {commentList.length ? (
        commentList.map((comment, index) => (
          <div key={comment.comment.id}>
            <CommentCard comment={comment} feedId={feedId} />
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
