import ContentContainer from '@/components/Common/ContentContainer';
import FeedCardList from '@/components/Feed/FeedCardList';
import PostList from '@/components/Post/PostList';
import { useState } from 'react';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<
    'feed' | 'post' | 'scrap'
  >('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  return (
    <div>
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
    </div>
  );
}
