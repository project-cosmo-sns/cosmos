import ContentContainer from '@/components/Common/ContentContainer';
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
      >
        {selectedOption === 'feed' ? (
          <div>feed</div>
        ) : (
          <PostList selectedSort={selectedSort} />
        )}
      </ContentContainer>
    </div>
  );
}
