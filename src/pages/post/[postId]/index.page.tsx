import { BackIcon } from '@/components/Common/IconCollection';
import PostContent from '@/components/Post/PostContent';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.scss';

const cn = classNames.bind(styles);

export default function PostDetailPage() {
  const router = useRouter();

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        className={cn('back')}
        onClick={() => router.push('/?tab=post')}
      />
      <PostContent />
    </div>
  );
}
