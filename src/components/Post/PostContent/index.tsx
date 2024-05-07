import fetchData from '@/api/fetchData';
import WriterProfile from '@/components/Common/WriterProfile';
import ActionButtons from '@/components/Common/Buttons/ActionButtons';
import EmojiBundle from '@/components/Common/EmojiBundle';
import Modal from '@/components/Common/Layout/Modal';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import { HashTagType, PostDetailType } from '../types';
import styles from './PostContent.module.scss';

interface PostContentProps {
  postData: PostDetailType;
}

const cn = classNames.bind(styles);

export default function PostContent({ postData }: PostContentProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  const { post, writer } = postData.postDetail;
  const {
    category,
    title,
    createdAt,
    content,
    hashTags,
    emojis,
    viewCount,
    commentCount,
    isMine,
  } = post;

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}`,
        method: 'delete',
      }),
    onSuccess: () => router.push('/'),
  });

  const { handleEmojiClick, isAddPending, isDeletePending } =
    useSendEmojiRequest(Number(postId), true);

  return (
    <div className={cn('wrapper')}>
      <span className={cn('category')}>{category}</span>
      <span className={cn('title')}>{title}</span>
      <div className={cn('header')}>
        <WriterProfile writer={writer} createdAt={createdAt} />
        <ActionButtons
          isButtonShow={isMine}
          handleClickEdit={() => router.push(`/write?postId=${postId}`)}
          handleClickDelete={() => setIsDeleteModalOpen(true)}
        />
        <Modal
          modalVisible={isDeleteModalOpen}
          toggleModal={setIsDeleteModalOpen}
          cssComponentDisplay={cn('')}
          cssModalSize={cn('')}
        >
          <div>삭제하시겠습니까?</div>
          <button type="button" onClick={() => deleteMutate()}>
            예
          </button>
          <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
            아니오
          </button>
        </Modal>
      </div>
      <div className={cn('divide-line')} />
      <MarkdownContent className={cn('markdown-content')} content={content} />
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
    </div>
  );
}
