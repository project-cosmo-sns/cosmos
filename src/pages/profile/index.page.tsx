import { useEffect, useState } from 'react';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEditModal from '@/components/Profile/ProfileEditModal';
import { MemberDataType, memberMockData } from '@/pages/profile/mockData';
import classNames from 'classnames/bind';
import styles from './MemberDataContainer.module.scss';
import ContentContainer from '@/components/Common/ContentContainer';
import { ContainerOptionType } from '@/@types/type';
import FeedCardList from '@/components/Feed/FeedCardList';
import PostList from '@/components/Post/PostList';
import ScrapList from '@/components/Common/ScrapList';

const cn = classNames.bind(styles);

export default function MemberDataContainer() {
  const [memberData, setMemberData] = useState<MemberDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  useEffect(() => {
    setMemberData(memberMockData);
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case 'feed':
        return <FeedCardList />;
      case 'post':
        return <PostList selectedSort={selectedSort} />;
      case 'scrap':
        return <ScrapList />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('content')}>
      {memberData && (
        <>
          <ProfileHeader
            memberData={memberData}
            setIsModalOpen={setIsModalOpen}
          />
          <ProfileEditModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            memberData={memberData}
          />
        </>
      )}
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        isMyProfile
      >
        {renderContent()}
      </ContentContainer>
    </div>
  );
}
