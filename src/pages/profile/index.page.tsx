import { useState } from 'react';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEditModal from '@/components/Profile/ProfileEditModal';
import { MemberDataType } from './types';
import classNames from 'classnames/bind';
import styles from './MemberDataContainer.module.scss';
import ContentContainer from '@/components/Common/ContentContainer';
import { ContainerOptionType } from '@/@types/type';
import { fetchMemberData } from './api';
import { GetServerSideProps } from 'next';
import { FeedDetailType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import ProfileContent from '@/components/Profile/ProfileContent/ProfileContent';
import EmptyContent from '@/components/Profile/ProfileContent/EmptyContent';

const cn = classNames.bind(styles);

export interface MemberDataContainerPropsType {
  myFeedList: FeedDetailType[];
  myPostList: PostListType;
  memberData: MemberDataType;
  error?: boolean;
}

// 프로필 SSR get 컴포넌트
export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchMemberData(context);
};

export default function MemberDataContainer({
  myFeedList,
  myPostList,
  memberData,
  error,
}: MemberDataContainerPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [newMemberData, setNewMemberData] = useState(memberData);

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
            setNewMemberData={setNewMemberData}
            newMemberData={newMemberData}
          />
        </>
      )}
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      >
        {memberData.authorizationStatus === 'ACCEPT' && (
          <ProfileContent
            selectedOption={selectedOption}
            myFeedList={myFeedList}
            myPostList={myPostList}
          />
        )}
        ;
        {memberData.authorizationStatus === 'NONE' && (
          <EmptyContent selectedOption={selectedOption} />
        )}
      </ContentContainer>
    </div>
  );
}
