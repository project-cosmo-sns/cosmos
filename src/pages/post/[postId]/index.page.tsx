import { BackIcon, ScrollTopIcon } from '@/components/Common/IconCollection';
import ModalPortal from '@/components/Common/Layout/Modal/ModalPortal';
import PostContent from '@/components/Post/PostContent';
import scrollToTop from '@/utils/scrollToTop';
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
        onClick={() => router.back()}
      />
      <PostContent />
      <ModalPortal>
        <div className={cn('scroll-top')} onClick={scrollToTop}>
          <ScrollTopIcon />
        </div>
      </ModalPortal>
    </div>
  );
}
