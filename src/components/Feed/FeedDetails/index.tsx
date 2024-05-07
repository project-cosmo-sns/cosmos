import CommentCard from '@/components/Common/CommentCard';
import CommentInput, { Comment } from '@/components/Common/CommentInput';
import classNames from 'classnames/bind';
import FeedCard from '@/components/Feed/FeedCard/index';
import { PostCommentType } from '@/components/Common/CommentInput/api';
import fetchData from '@/api/fetchData';
import {
  patchComment,
  deleteComment,
  deleteLikeComment,
  postLikeComment,
} from '@/components/Common/CommentCard/api';
import styles from './FeedDetails.module.scss';
import { FeedDetailType, CommentDetailType, CommentListType } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * @return {JSX.Element} FeedDetails - 추후에 변경 예정입니다. 피드 리스트에서 특정 피드를 클릭한다면 클리한 피드의 아이디를 통해 데이터를 요청해 화면에 보여줍니다.
 */

export default function FeedDetails({ feedId }: { feedId: number }) {
  const cn = classNames.bind(styles);

  const {
    data: feedData,
    isPending: isFeedDataPending,
    isError: isFeedDataError,
  } = useQuery({
    queryKey: ['feedDetails', feedId],
    queryFn: ({ queryKey }) =>
      fetchData<FeedDetailType>({
        param: `feed/${queryKey[1]}/detail`,
      }),
  });

  const {
    data: commentListData,
    isPending: isCommentDataPending,
    isError: isCommentDataError,
  } = useQuery({
    queryKey: ['feedComments', feedId],
    queryFn: ({ queryKey }) =>
      fetchData<CommentListType>({
        param: `feed/${queryKey[1]}/comment/list`,
      }),
  });

  const postCommentMutate = useMutation({
    mutationFn: (data: Comment) =>
      fetchData<PostCommentType>({
        param: `feed/${feedId}/comment`,
        method: 'post',
        requestData: {
          content: data.comment,
        },
      }),
  });

  const feed: FeedDetailType = feedData ?? {
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
  };
  const commentList: CommentDetailType[] = commentListData?.data ?? [];
  if (isFeedDataPending) return '피드 데이터 불러오는 중...';
  if (isFeedDataError) return '피드 데이터 에러 발생!';
  if (isCommentDataPending) return '코멘트 데이터 불러오는 중...';
  if (isCommentDataError) return '코멘트 데이터 에러 발생!';

  const onSubmit = (data: Comment) => {
    postCommentMutate.mutate(data);
    console.log(data, '-----데이터-----');
  };

  return (
    <div className={cn('container')}>
      <FeedCard feedData={feed} hasPadding={false} forDetails />
      <CommentInput placeholder="댓글을 입력하세요" onSubmit={onSubmit} />
      {commentList.length ? (
        commentList.map((comment, index) => (
          <div key={comment.comment.id}>
            <CommentCard
              comment={comment}
              postId={feedId}
              deleteLikeRequest={deleteComment}
              postLikeRequest={postLikeComment}
              deleteCommentRequest={deleteLikeComment}
              editCommentRequest={patchComment}
            />
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
