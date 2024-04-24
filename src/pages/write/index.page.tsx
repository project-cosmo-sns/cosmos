import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { BackIcon } from '@/components/Common/IconCollection';
import PostEditor from '@/components/Post/PostEditor';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostWritePage.module.scss';
import { PostData, mockData } from '../post/[postId]/mockData';
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function PostWritePage() {
  const router = useRouter();
  const [data, setData] = useState<PostData | undefined>();
  const { postId } = router.query;

  // 포스트 등록 시 실행할 함수 임시로 생성. 추후 등록요청 보내고 받아온 postId에 해당하는 페이지로 이동
  const handleSubmitPostData = (newData: PostData | undefined) => {
    if (data) {
      setData(newData);
      mockData.push(data);
    } else {
      alert('데이터를 입력해주세요');
    }
  };

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        onClick={() => router.back()}
        className={cn('back')}
      />
      <h2 className={cn('title')}>{postId ? '포스트 수정' : '포스트 작성'}</h2>
      <PostEditor postId={postId as string} setData={setData} />
      <div className={cn('button-container')}>
        <DefaultButton
          buttonType="button"
          onClick={() => handleSubmitPostData(data)}
          size="large"
          color="purple"
        >
          등록하기
        </DefaultButton>
      </div>
    </div>
  );
}
