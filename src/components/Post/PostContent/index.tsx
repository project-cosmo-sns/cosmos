import AuthorProfile from '@/components/Common/AuthorProfile';
import ActionButtons from '@/components/Common/Buttons/ActionButtons';
import Modal from '@/components/Common/Layout/Modal';
import ReactionContainer from '@/components/Common/ReactionContainer';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import { HashTagType, PostDetailType } from '../types';
import styles from './PostContent.module.scss';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import EmojiButton from '@/components/Common/EmojiButton';
import { EMOJI_ICON } from '@/constants/EmojiCode';
import EmojiBundle from '@/components/Common/EmojiBundle';

interface PostContentProps {
  postData: PostDetailType;
}

const cn = classNames.bind(styles);

export default function PostContent({ postData }: PostContentProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { postId } = router.query;

  const { post, writer, hashTags, emoji } = postData.postDetail;
  const {
    category,
    title,
    createdAt,
    content,
    emojiCount,
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

  console.log(emoji);

  return (
    <div className={cn('wrapper')}>
      <span className={cn('category')}>{category}</span>
      <span className={cn('title')}>{title}</span>
      <div className={cn('header')}>
        <AuthorProfile author={writer} createdAt={createdAt} />
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
      <EmojiBundle emojiList={emoji} isDetail />
      {/* <ReactionContainer
        emoji={emojiCount}
        commentsCount={commentCount}
        views={viewCount}
        handleEmojiClick={() =>
          console.log('이모지 모달 열기 or 좋아요만 하려면 이모지 토글')
        }
      /> */}
    </div>
  );
}
