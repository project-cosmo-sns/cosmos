import fetchData from '@/api/fetchData';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { BackIcon } from '@/components/Common/IconCollection';
import PostEditor from '@/components/Post/PostEditor';
import { PostRequestType } from '@/components/Post/types';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './PostWritePage.module.scss';

const cn = classNames.bind(styles);

export default function PostWritePage() {
  const router = useRouter();
  const [data, setData] = useState<PostRequestType>({
    title: '',
    category: '공지사항',
    content: '',
    hashTags: [],
  });

  const { postId } = router.query;

  const { mutate: createMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/create`,
        method: 'post',
        requestData: data,
      }),
    onSuccess: (response) => router.push(`/post/${response.id}`),
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}`,
        method: 'patch',
        requestData: data,
      }),
    onSuccess: () => router.push(`/post/${postId}`),
  });

  const mergeState = (nextState: Partial<PostRequestType>) => {
    setData((prev) => ({ ...prev, ...nextState }));
  };

  const handleSubmitPostData = () => {
    if (!data.title && !data.content) {
      // setIsToastVisible(true);
      return;
    }
    if (postId) {
      editMutate();
      return;
    }
    createMutate();
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
      <PostEditor
        postId={postId as string}
        postData={data}
        mergeState={mergeState}
      />
      <div className={cn('button-container')}>
        <DefaultButton
          buttonType="button"
          onClick={() => handleSubmitPostData()}
          size="large"
          color="purple"
        >
          {postId ? '수정하기' : '등록하기'}
        </DefaultButton>
      </div>
      {/* <Toast
        text="내용을 입력해주세요"
        icon={WarnIcon}
      /> */}
    </div>
  );
}
