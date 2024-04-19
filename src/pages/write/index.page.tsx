import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { BackIcon } from '@/components/Common/IconCollection';
import PostEditor from '@/components/Post/PostEditor';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostWritePage.module.scss';

export default function PostWritePage() {
  const cn = classNames.bind(styles);
  const router = useRouter();

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        onClick={() => router.back()}
        className={cn('back')}
      />
      <h2 className={cn('title')}>포스트 작성</h2>
      <PostEditor />
      <DefaultButton
        buttonType="button"
        onClick={() =>
          console.log('등록요청 보내고 받아온 postId에 해당하는 페이지로 이동')
        }
        size="medium"
        color="purple"
      >
        등록하기
      </DefaultButton>
    </div>
  );
}
