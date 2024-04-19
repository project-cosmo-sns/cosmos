import styles from './FeedCardList.module.scss';
import classNames from 'classnames/bind';
import FeedCard from '@/components/Feed/FeedCard/index';
import MOCKDATA from './mockData';

export default function FeedCardList() {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('feed-card-list-container')}>
      {MOCKDATA.map(
        ({
          term,
          userImage,
          userName,
          date,
          content,
          emojiCount,
          commentCount,
          eyeCount,
        }) => (
          <FeedCard
            key={term}
            userImage={userImage}
            userName={userName}
            term={term}
            date={date}
            content={content}
            emojiCount={emojiCount}
            commentCount={commentCount}
            eyeCount={eyeCount}
          />
        ),
      )}
    </div>
  );
}
