import classNames from 'classnames/bind';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  CommentIcon,
  EmojiIcon,
  EyeIcon,
  EmojiHeartIcon,
  EmojiThumbsUpIcon,
  EmojiLaughIcon,
  EmojiSadIcon,
  EmojiCheckIcon,
  EmojiMeIcon,
} from '../IconCollection';
import styles from './ReactionContainer.module.scss';
import EmojiBundle from './EmojiBundle';

interface ReactionContainerProps {
  emoji: number;
  commentsCount: number;
  views: number;
  handleEmojiClick?: Dispatch<SetStateAction<boolean>>;
  emojiVisible?: boolean;
  forDetails?: boolean;
}

/**
 * 이모지, 댓글, 조회수를 보여주는 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.emoji - 선택된 이모지
 * @param {number} props.commentsCount - 댓글 수
 * @param {number} props.views - 조회 수
 * @param {Function} props.handleEmojiClick - 이모지 클릭 이벤트 핸들러
 * @returns {JSX.Element} 리액션 컨테이너 JSX 요소
 */

export default function ReactionContainer({
  emoji,
  commentsCount,
  views,
  handleEmojiClick,
  emojiVisible,
  forDetails = false,
}: ReactionContainerProps) {
  const cn = classNames.bind(styles);
  const [hasReaction, setHasReaction] = useState(false);
  return (
    <div className={cn('wrapper')}>
      {forDetails ? (
        <p>디테일 전용</p>
      ) : (
        <button
          type="button"
          className={cn('reaction', 'emoji')}
          onClick={() => handleEmojiClick && handleEmojiClick(!emojiVisible)}
        >
          {hasReaction ? (
            <p>반응 남김</p>
          ) : (
            <EmojiIcon width="18" height="18" />
          )}
          {emoji}
        </button>
      )}

      <button type="button" className={cn('reaction', 'comment')}>
        <CommentIcon width="18" height="18" />
        {commentsCount}
      </button>
      <button type="button" className={cn('reaction', 'view')}>
        <EyeIcon width="18" height="18" />
        {views}
      </button>
      {emojiVisible && (
        <EmojiBundle
          emojiVisible={emojiVisible}
          handleEmojiClick={handleEmojiClick}
          toggleHasReaction={setHasReaction}
        >
          <EmojiHeartIcon />
          <EmojiThumbsUpIcon />
          <EmojiLaughIcon />
          <EmojiSadIcon />
          <EmojiCheckIcon />
          <EmojiMeIcon />
        </EmojiBundle>
      )}
    </div>
  );
}
