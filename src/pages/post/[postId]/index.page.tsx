import { BackIcon } from '@/components/Common/IconCollection';
import PostComment from '@/components/Post/PostComment';
import PostContent from '@/components/Post/PostContent';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.scss';
import { mockData } from './mockData';

const cn = classNames.bind(styles);

export default function PostDetailPage() {
  const router = useRouter();
  // isMyPost는 author.id === userId 일 때 true
  const isMyPost = true;

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        className={cn('back')}
        onClick={() => router.back()}
      />
      <PostContent isMyPost={isMyPost} postData={mockData[0]} />
      <PostComment postData={mockData[0]} />
    </div>
  );
}
