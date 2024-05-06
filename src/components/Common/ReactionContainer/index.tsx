import classNames from 'classnames/bind';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  emojiCount: number;
  commentCount: number;
  viewCount: number;
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

const cn = classNames.bind(styles);

export default function ReactionContainer({
  emojiCount,
  commentCount,
  viewCount,
}: ReactionContainerProps) {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('reaction', 'emoji')}>
        <EmojiIcon width="18" height="18" />
        {emojiCount}
      </div>
      <div className={cn('reaction', 'comment')}>
        <CommentIcon width="18" height="18" />
        {commentCount}
      </div>
      <div className={cn('reaction', 'view')}>
        <EyeIcon width="18" height="18" />
        {viewCount}
      </div>
    </div>
  );
}
