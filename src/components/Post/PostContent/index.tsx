import AuthorProfile from '@/components/Common/AuthorProfile';
import ActionButtons from '@/components/Common/Buttons/ActionButtons';
import Modal from '@/components/Common/Layout/Modal';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { PostData, Tag } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import styles from './PostContent.module.scss';

interface PostContentProps {
  isMyPost: boolean;
  postData: PostData;
}

const cn = classNames.bind(styles);

export default function PostContent({ isMyPost, postData }: PostContentProps) {
  const router = useRouter();
  const { postId } = router.query;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    category,
    title,
    author,
    createdAt,
    content,
    tags,
    emoji,
    views,
    comments,
  } = postData;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <span className={cn('category')}>{category}</span>
      <span className={cn('title')}>{title}</span>
      <div className={cn('header')}>
        <AuthorProfile author={author} createdAt={formattedCreatedAt} />
        <ActionButtons
          isButtonShow={isMyPost}
          handleClickEdit={() => router.push(`/write?postId=${postId}`)}
          handleClickDelete={() => setIsDeleteModalOpen(true)}
        />
        {isDeleteModalOpen && (
          <Modal
            title="삭제 모달"
            modalVisible={isDeleteModalOpen}
            toggleModal={setIsDeleteModalOpen}
            cssComponentDisplay={cn('')}
            cssModalSize={cn('')}
          >
            <div>하이</div>
          </Modal>
        )}
      </div>
      <div className={cn('divide-line')} />
      <MarkdownContent className={cn('markdown-content')} content={content} />
      <div className={cn('hashtag-container')}>
        {tags.map((tag: Tag) => (
          <HashTag key={`${tag.name}`} tag={tag} />
        ))}
      </div>
      <ReactionContainer
        emoji={emoji}
        commentsCount={comments.length}
        views={views}
        handleEmojiClick={() =>
          console.log('이모지 모달 열기 or 좋아요만 하려면 이모지 토글')
        }
      />
    </div>
  );
}
