import fetchData from '@/api/fetchData';
import { BackIcon } from '@/components/Common/IconCollection';
import { CommentListType } from '@/components/Feed/types';
import PostComment from '@/components/Post/PostComment';
import PostContent from '@/components/Post/PostContent';
import { PostDetailType } from '@/components/Post/types';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.scss';

const cn = classNames.bind(styles);

export default function PostDetailPage() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postData } = useQuery<PostDetailType>({
    queryKey: ['postData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/detail`,
      }),
    enabled: !!postId,
  });

  const { data: commentData } = useQuery<CommentListType>({
    queryKey: ['commentData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/comment/list`,
      }),
    enabled: !!postId,
  });

  return (
    postData && (
      <div className={cn('wrapper')}>
        <BackIcon
          width="18"
          height="18"
          className={cn('back')}
          onClick={() => router.back()}
        />
        <PostContent postData={postData} />
        {/* <PostComment commentData={commentData} /> */}
      </div>
    )
  );
}
