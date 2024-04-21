import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { BackIcon } from '@/components/Common/IconCollection';
import PostEditor from '@/components/Post/PostEditor';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostWritePage.module.scss';

const cn = classNames.bind(styles);

export default function PostWritePage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        onClick={() => router.back()}
        className={cn('back')}
      />
      <h2 className={cn('title')}>{postId ? '포스트 수정' : '포스트 작성'}</h2>
      <PostEditor postId={postId as string} />
      <div className={cn('button-container')}>
        <DefaultButton
          buttonType="button"
          onClick={() =>
            console.log(
              '등록요청 보내고 받아온 postId에 해당하는 페이지로 이동',
            )
          }
          size="large"
          color="purple"
        >
          등록하기
        </DefaultButton>
      </div>
    </div>
  );
}
