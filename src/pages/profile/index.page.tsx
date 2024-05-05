import { useState } from 'react';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEditModal from '@/components/Profile/ProfileEditModal';
import { MemberDataType } from './types';
import classNames from 'classnames/bind';
import styles from './MemberDataContainer.module.scss';
import ContentContainer from '@/components/Common/ContentContainer';
import { ContainerOptionType } from '@/@types/type';
import FeedList from '@/components/Feed/FeedList';
import PostList from '@/components/Post/PostList';
import ScrapList from '@/components/Common/ScrapList';
import { fetchMemberData } from './api';
import { GetServerSideProps } from 'next';
import { FeedDetailType } from '@/components/Feed/types';

const cn = classNames.bind(styles);

interface MemberDataContainerPropsType {
  feedList: FeedDetailType[];
  memberData: MemberDataType;
  error?: boolean;
}
// 프로필 SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchMemberData(context);
};

export default function MemberDataContainer({
  feedList,
  memberData,
  error,
}: MemberDataContainerPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  const renderContent = () => {
    switch (selectedOption) {
      case 'feed':
        return feedList ? (
          <FeedList feedList={feedList} />
        ) : (
          '작성된 글이 없습니다.'
        );
      case 'post':
        return <PostList selectedSort={selectedSort} isMyProfile />;
      case 'scrap':
        return <ScrapList />;
      default:
        return null;
    }
  };

  if (!memberData.isAuthorized || error) {
    return (
      <div>
        {memberData && (
          <ProfileHeader
            memberData={memberData}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {/* <MyPostList memberData={memberData} /> */}
        {/* <ContentContainer
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          isMyProfile
        >
          {renderContent()}
        </ContentContainer> */}
      </div>
    );
  }

  if (!memberData) {
    return <div>Lodading~~~~~</div>;
  }

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
