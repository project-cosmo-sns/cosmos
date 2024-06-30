import { ReplyDetailType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import DeleteModal from '../DeleteModal';
import TextWithLinks from '../TextWithLinks';
import WriterProfile from '../WriterProfile';
import styles from './ReplyCard.module.scss';

const cn = classNames.bind(styles);

interface ReplyCardProps {
  replyData: ReplyDetailType;
}

export default function ReplyCard({ replyData }: ReplyCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className={cn('reply-card')}>
      <div className={cn('reply-writer')}>
        <WriterProfile
          writer={replyData.writer}
          createdAt={getElapsedTime(replyData.reply.createdAt)}
        />
        {/* <div className={cn('like-container')}>
      {replyData.reply.isHearted ? (
        <LikedIcon width="18" />
      ) : (
        <LikeIcon width="18" />
      )}
      <span className={cn('like-count')}>
        {replyData.reply.heartCount}
      </span>
    </div> */}
        <ActionButtons
          isButtonShow={replyData.reply.isMine}
          handleClickEdit={() => console.log(replyData.reply.id)}
          handleClickDelete={() => setIsDeleteModalOpen(true)}
        />
      </div>
      <TextWithLinks text={replyData.reply.content} />
      <DeleteModal
        title="삭제"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={() => {
          console.log(replyData.reply.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
