import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import TodayQuestion from '@/components/Common/TodayQuestion';
import FeedCardList from '@/components/Feed/FeedCardList';
import PostList from '@/components/Post/PostList';
import { useState } from 'react';

export default function Home() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  return (
    <>
      <TodayQuestion />
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      >
        {selectedOption === 'feed' ? (
          <FeedCardList />
        ) : (
          <PostList selectedSort={selectedSort} />
        )}
      </ContentContainer>
      <div id="modal-root">[]</div>
    </>
  );
}
