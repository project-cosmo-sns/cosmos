import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';
import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { FeedData } from '../FeedCardList/mockData';

interface FeedCardTypes {
  feedData: FeedData;
  modalVisible?: boolean;
  toggleModal?: Dispatch<SetStateAction<boolean>>;
  hasPadding: boolean;
}

const cn = classNames.bind(styles);

export default function FeedCard({
  feedData,
  modalVisible = false,
  toggleModal,
  hasPadding,
}: FeedCardTypes) {
  const { author, createdAt, content, reactionCount, commentsCount, eyeCount } =
    feedData;
  return (
    <div
      onClick={() => toggleModal && toggleModal(!modalVisible)}
      className={cn('container', hasPadding && 'padding')}
    >
      <div className={cn('wrapper')}>
        <AuthorProfile author={author} createdAt={createdAt} />
        <div className={cn('content')}>{content}</div>
        <ReactionContainer
          emoji={reactionCount}
          commentsCount={commentsCount}
          views={eyeCount}
        />
      </div>
    </div>
  );
}
