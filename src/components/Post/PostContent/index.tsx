import fetchData from '@/api/fetchData';
import ActionButtons from '@/components/Common/Buttons/ActionButtons';
import DeleteModal from '@/components/Common/DeleteModal';
import EmojiBundle from '@/components/Common/EmojiBundle';
import WriterProfile from '@/components/Common/WriterProfile';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import PostComment from '../PostComment';
import { HashTagType, PostDetailType } from '../types';
import styles from './PostContent.module.scss';

const cn = classNames.bind(styles);

export default function PostContent() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { postId } = router.query;

  const {
    data: postData,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery<PostDetailType>({
    queryKey: ['postData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/detail`,
      }),
    enabled: !!postId,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}/view-count/increase`,
        method: 'post',
      }),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}`,
        method: 'delete',
      }),
    onSuccess: () => router.push('/?tab=feed'),
  });

  const { handleEmojiClick, isAddPending, isDeletePending } =
    useSendEmojiRequest({
      id: Number(postId),
      isPost: true,
    });

  useEffect(() => {
    if (postId && isSuccess) mutate();
  }, [postId, isSuccess]);

  if (isPending) <>...Loading</>;
  if (isError) <>로그인모달</>;
  if (isSuccess) {
    const { post, writer } = postData.postDetail;
    const {
      category,
      title,
      createdAt,
      content,
      hashTags,
      emojis,
      emojiCount,
      viewCount,
      commentCount,
      isMine,
    } = post;

    return (
      <>
        <div className={cn('wrapper')}>
          <span className={cn('category')}>{category}</span>
          <span className={cn('title')}>{title}</span>
          <div className={cn('header')}>
            <WriterProfile
              writer={writer}
              createdAt={createdAt.slice(0, 10).replace(/-/g, '.')}
            />
            <ActionButtons
              isButtonShow={isMine}
              handleClickEdit={() => router.push(`/write?postId=${postId}`)}
              handleClickDelete={() => setIsDeleteModalOpen(true)}
            />
          </div>
          <div className={cn('divide-line')} />
          <MarkdownContent
            className={cn('markdown-content')}
            content={content}
          />
          <div className={cn('hashtag-container')}>
            {hashTags.map((tag: HashTagType) => (
              <HashTag key={`${tag.tagName}`} tag={tag} />
            ))}
          </div>
          <EmojiBundle
            isPost
            commentCount={commentCount}
            viewCount={viewCount}
            emojiList={emojis}
            handleEmojiClick={handleEmojiClick}
            isPending={isAddPending || isDeletePending}
          />
          <PostComment postId={Number(postId)} />
        </div>
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={deleteMutate}
        />
      </>
    );
  }
}
