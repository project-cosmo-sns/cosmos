import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import { CheckIcon } from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import TodayQuestion from '@/components/Common/TodayQuestion';
import FeedList from '@/components/Feed/FeedList';
import { getFeedList } from '@/components/Feed/FeedList/api';
import PostList from '@/components/Post/PostList';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FeedDetailType, FeedListType } from '../components/Feed/types';

export const getServerSideProps = async () => {
  const feedList: FeedListType = await getFeedList();
  return {
    props: {
      feedList: feedList.data,
    },
  };
};

interface HomePropsType {
  feedList: FeedDetailType[];
}

const cn = classNames.bind(styles);

export default function Home({ feedList }: HomePropsType) {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('generation')) {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        localStorage.removeItem('generation');
      }, 5000);
    }
  }, []);

  return (
    <div className={cn('home-container')}>
      <TodayQuestion />
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      >
        {selectedOption === 'feed' ? (
          <FeedList feedList={feedList} />
        ) : (
          <PostList selectedSort={selectedSort} />
        )}
      </ContentContainer>
      <Toast
        isVisible={toastVisible}
        text="인증 신청이 완료되었습니다"
        icon={CheckIcon}
        fill="#0ACF83"
      />
    </div>
  );
}
