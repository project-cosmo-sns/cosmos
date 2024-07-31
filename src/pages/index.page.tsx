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
import { useState } from 'react';
import { FeedListType } from '../components/Feed/types';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const initialOption = context.query.tab === 'post' ? 'post' : 'feed';

  const feedList = await fetchInitialFeed<FeedListType>(context);
  const postList = await fetchInitialPost<PostListType>(context);

  return {
    props: {
      feedList,
      postList,
      initialOption,
    },
  };
};

interface HomePropsType {
  feedList: { props: { response: FeedListType } };
  postList: { props: { response: PostListType } };
  initialOption: ContainerOptionType;
}

const cn = classNames.bind(styles);

export default function Home({
  feedList,
  postList,
  initialOption,
}: HomePropsType) {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>(initialOption);
  const [selectedSort, setSelectedSort] = useState<SortType>('ALL');

  return (
    <div className={cn('home-wrapper')}>
      <div className={cn('home-container')}>
        <TodayQuestion />
        <ContentContainer
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        >
          {selectedOption === 'feed' ? (
            <FeedList
              feedList={feedList.props.response}
              selectedSort={selectedSort}
            />
          ) : (
            <PostList
              initialPostList={postList.props.response}
              selectedSort={selectedSort}
            />
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
