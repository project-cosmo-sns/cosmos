import ContentContainer from '@/components/Common/ContentContainer';
import { useState } from 'react';

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<
    'post' | 'feed' | 'scrap'
  >('feed');

  return (
    <div
      style={{
        background: '#f3f3f3',
        width: '100%',
        height: '100vh',
        padding: '20px',
      }}
    >
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isMyProfile
      >
        컨텐츠 내용
      </ContentContainer>
    </div>
  );
}
