import classNames from 'classnames/bind';
import { MouseEvent } from 'react';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  emoji: number;
  commentsCount: number;
  views: number;
  handleEmojiClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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
}: ReactionContainerProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('wrapper')}>
      <button
        type="button"
        className={cn('reaction', 'emoji')}
        onClick={handleEmojiClick}
      >
        <EmojiIcon width="18" height="18" />
        {emoji}
      </button>
      <button type="button" className={cn('reaction', 'comment')}>
        <CommentIcon width="18" height="18" />
        {commentsCount}
      </button>
      <button type="button" className={cn('reaction', 'view')}>
        <EyeIcon width="18" height="18" />
        {views}
      </button>
    </div>
  );
}
