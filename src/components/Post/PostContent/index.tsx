import fetchData from '@/api/fetchData';
import ActionButtons from '@/components/Common/Buttons/ActionButtons';
import DeleteModal from '@/components/Common/DeleteModal';
import EmojiBundle from '@/components/Common/EmojiBundle';
import WriterProfile from '@/components/Common/WriterProfile';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import PostComment from '../PostComment';
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
        <WriterProfile
          writer={writer}
          createdAt={createdAt.slice(0, 10).replace(/-/g, '.')}
        />
        <ActionButtons
          isButtonShow={isMine}
          handleClickEdit={() => router.push(`/write?postId=${postId}`)}
          handleClickDelete={() => setIsDeleteModalOpen(true)}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={deleteMutate}
        />
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
      <PostComment postId={Number(postId)} />
    </div>
  );
}
