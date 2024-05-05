import { useState } from 'react';
import classNames from 'classnames/bind';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import FeedCard from '@/components/Feed/FeedCard/index';
import Modal from '@/components/Common/Layout/Modal';
import styles from '@/components/Feed/FeedList/FeedList.module.scss';
import { FeedDetailType } from '@/components/Feed/types';
import { MemberDataType } from '@/pages/profile/types';

interface MyFeedListType {
  memberData: MemberDataType;
  feedList: FeedDetailType[];
}

export default function MyFeedList({ feedList, memberData }: MyFeedListType) {
  const cn = classNames.bind(styles);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedId, setFeedId] = useState<number>(0);

  // 현재 사용자의 아이디 (memberData를 profile페이지에서 넘겨줄것)
  const currentUserId = memberData.memberId;

  // !!!!!!!!! 콘솔 찍어보니 이 값이 undefined라서 filter가 안됨.
  // 현재 memberData에는 memberId 값이 없음. 내 id 값이 없어서 일단 기다려보기로
  console.log('memberData : ', memberData);

  // 내가 작성한 피드만 필터링
  const myFeeds = feedList.filter((feed) => feed.writer.id === currentUserId);
  // console.log('feedList : ', feedList);
  // console.log('myFeeds : ', myFeeds);
  // console.log('currentUserId : ', currentUserId);

  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={cn('container')}>
        {myFeeds?.map((item) => (
          <FeedCard
            key={item.feed.id}
            feedData={item}
            modalVisible={isModalOpen}
            toggleModal={setIsModalOpen}
            hasPadding
            forDetails={false}
            onClick={() => handleClick(item.feed.id)}
          />
        ))}
      </div>
      <Modal
        toggleModal={setIsModalOpen}
        modalVisible={isModalOpen}
        cssModalSize={cn('feed-detail-modalSize')}
        cssComponentDisplay={cn('feed-detail-componentDisplay')}
      >
        <FeedDetails feedId={feedId} />
      </Modal>
    </>
  );
}
