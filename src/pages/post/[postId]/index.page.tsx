import { BackIcon } from '@/components/Common/IconCollection';
import PostComment from '@/components/Post/PostComment';
import PostContent from '@/components/Post/PostContent';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.scss';
import { PostData, mockData } from './mockData';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

export default function PostDetailPage() {
  const router = useRouter();
  const { postId } = router.query;
  // isMyPost는 author.id === userId 일 때 true
  const isMyPost = true;

  // 임시로 mockData에서 postId와 같은 데이터 가져옴. 추후 postId를 이용해 요청하도록 수정
  const [postData, setPostData] = useState<PostData>();
  useEffect(() => {
    setPostData(mockData.filter((data) => data.id === postId)[0]);
  }, [postId]);

  return (
    postData && (
      <div className={cn('wrapper')}>
        <BackIcon
          width="18"
          height="18"
          className={cn('back')}
          onClick={() => router.back()}
        />
        <PostContent isMyPost={isMyPost} postData={postData} />
        <PostComment postData={postData} />
      </div>
    )
  );
}
