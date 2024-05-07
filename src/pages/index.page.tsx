import { ContainerOptionType } from '@/@types/type';
import { fetchInitialFeed } from '@/api/fetchInitialFeed';
import { fetchInitialPost } from '@/api/fetchInitialPost';
import ContentContainer from '@/components/Common/ContentContainer';
import TodayQuestion from '@/components/Common/TodayQuestion';
import FeedList from '@/components/Feed/FeedList';
import PostList from '@/components/Post/PostList';
import { PostListType } from '@/components/Post/types';
import { SortType } from '@/constants/sortType';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FeedListType } from '../components/Feed/types';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const feedList = await fetchInitialFeed<FeedListType>(context);
  const postList = await fetchInitialPost<PostListType>(context);

  return {
    props: {
      feedList,
      postList,
    },
  };
};

interface HomePropsType {
  feedList: { props: { response: FeedListType } };
  postList: { props: { response: PostListType } };
}

const cn = classNames.bind(styles);

export default function Home({ feedList, postList }: HomePropsType) {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<SortType>('ALL');
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();

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
          <FeedList feedList={feedList.props.response} />
        ) : (
          <PostList
            postList={postList.props.response}
            selectedSort={selectedSort}
          />
        )}
      </ContentContainer>
      {/* <Toast
        text="인증 신청이 완료되었습니다"
        icon={CheckIcon}
        fill="#0ACF83"
      /> */}
    </div>
  );
}
