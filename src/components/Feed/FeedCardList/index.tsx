import styles from './FeedCardList.module.scss';
import classNames from 'classnames/bind';
import FeedCard from '@/components/Feed/FeedCard/index';
import { useState } from 'react';
import { MOCKDATA } from './mockData';
import FeedDetails from '../FeedDetails';
import Modal from '@/components/Common/Layout/Modal';

export default function FeedCardList() {
  const cn = classNames.bind(styles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className={cn('container')}>
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
              modalVisible={isModalOpen}
              toggleModal={setIsModalOpen}
              hasPadding
            />
          ),
        )}
      </div>
      <div>
        {isModalOpen && (
          <Modal
            title=""
            toggleModal={setIsModalOpen}
            modalVisible={isModalOpen}
          >
            <FeedDetails />
          </Modal>
        )}
      </div>
    </>
  );
}
