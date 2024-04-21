import CommentCard from '@/components/Common/CommentCard';
import styles from './FeedDetails.module.scss';
import classNames from 'classnames/bind';
import FeedCard from '../FeedCard';
import CommentInput from '@/components/Common/CommentInput';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { mockData } from '@/pages/post/[postId]/mockData';
import { MOCKDATA2 } from '../FeedCardList/mockData';

export default function FeedDetails() {
  const cn = classNames.bind(styles);
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
  } = mockData[0];
  const {
    userImage,
    userName,
    term,
    date,
    contents,
    emojiCount,
    commentCount,
    eyeCount,
  } = MOCKDATA2[0];
  return (
    <div className={cn('feed-details-container')}>
      <FeedCard
        userImage={userImage}
        userName={userName}
        term={term}
        date={date}
        content={contents}
        emojiCount={emojiCount}
        commentCount={commentCount}
        eyeCount={eyeCount}
      />
      <div className={cn('feed-details-wrapper')}>
        <CommentInput placeholder="댓글을 입력해주세요" />
        <DefaultButton
          buttonType="submit"
          size="small"
          onClick={() => console.log('등록')}
          color="primary-01"
        >
          등록
        </DefaultButton>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            {index === comments.length - 1 || (
              <div className={cn('divide-line')} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
