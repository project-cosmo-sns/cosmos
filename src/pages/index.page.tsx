import { ContainerOptionType } from '@/@types/type';
import fetchData from '@/api/fetchData';
import ContentContainer from '@/components/Common/ContentContainer';
import { CheckIcon } from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import TodayQuestion from '@/components/Common/TodayQuestion';
import FeedList from '@/components/Feed/FeedList';
import { getFeedList } from '@/components/Feed/FeedList/api';
import PostList from '@/components/Post/PostList';
import { PostListDataType, PostListType } from '@/components/Post/types';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FeedDetailType, FeedListType } from '../components/Feed/types';
import { SortType } from '@/constants/sortType';

export const getServerSideProps = async () => {
  const feedList: FeedListType = await getFeedList();
  const postList = await fetchData<PostListType>({
    param: `post/list`,
  });

  return {
    props: {
      feedList: feedList.data,
      postList: postList.data,
    },
  };
};

interface HomePropsType {
  feedList: FeedDetailType[];
  postList: PostListDataType[];
}

const cn = classNames.bind(styles);

export default function Home({ feedList, postList }: HomePropsType) {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<SortType>('ALL');
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
          <PostList postList={postList} selectedSort={selectedSort} />
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
