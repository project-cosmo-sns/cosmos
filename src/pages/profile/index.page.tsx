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

  // 현재는 다른 유저일 경우 인증/미인증을 알 수 없어서 전부 미인증으로 뜨는 상태.
  // api를 새로 내려받게 되면 다시 처리할 것.
  if (!memberData || !memberData.isAuthorized || error) {
    console.log('memberData: ', memberData);
    return (
      <div>
        {memberData && (
          <ProfileHeader
            memberData={memberData}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <ContentContainer
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        >
          <div>미인증사용자입니다</div>
        </ContentContainer>
      </div>
    );
  }

  if (!memberData) {
    return <div>Lodading~~~~~</div>;
  }

  // const renderContent = () => {
  //   switch (selectedOption) {
  //     case 'feed':
  //       return myFeedList ? (
  //         <MyFeedList feedList={myFeedList} />
  //       ) : (
  //         '피드가 없습니다.'
  //       );
  //     case 'post':
  //       return myPostList ? (
  //         <MyPostList
  //           // selectedSort={}
  //           postList={myPostList}
  //         />
  //       ) : (
  //         '포스트가 없습니다.'
  //       );

  //     case 'scrap':
  //       return <ScrapList />;
  //     default:
  //       return null;
  //   }
  // };

  // const EmptyContent = () => {
  //   switch (selectedOption) {
  //     case 'feed':
  //       return <div className={cn('empty-content')}>피드가 없습니다.</div>;
  //     case 'post':
  //       return <div className={cn('empty-content')}>포스트가 없습니다.</div>;
  //     case 'scrap':
  //       return <div className={cn('empty-content')}>스크랩이 없습니다.</div>;
  //     default:
  //       return null;
  //   }
  // };

  // const AuthorizedContent = () => {
  //   return <>{renderContent()}</>;
  // };

  // const UnauthorizedContent = () => {
  //   return <>{EmptyContent()}</>;
  // };

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
        isMyProfile
      >
        {!memberData.isAuthorized ? (
          <ProfileContent
            selectedOption={selectedOption}
            myFeedList={myFeedList}
            myPostList={myPostList}
          />
        ) : (
          <EmptyContent selectedOption={selectedOption} />
        )}
      </ContentContainer>
    </div>
  );
}
