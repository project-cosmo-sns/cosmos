import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import PostEditor from '@/components/Post/PostEditor';
import classNames from 'classnames/bind';
import styles from './PostWritePage.module.scss';

export default function PostWritePage() {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('wrapper')}>
      <h2>포스트 작성</h2>
      <PostEditor />
      <DefaultButton
        buttonType="button"
        onClick={() => console.log('등록하기')}
        size="medium"
        color="purple"
      >
        등록하기
      </DefaultButton>
    </div>
  );
}
