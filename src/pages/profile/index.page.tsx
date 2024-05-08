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
import MyFeedList from '@/components/Profile/MyFeedList';
// import MyPostList from '@/components/Profile/MyPostList';
import {
  PostInfoType,
  PostListDataType,
  PostListType,
} from '@/components/Post/types';

import { SortType } from '@/constants/sortType';
import MyPostList from '@/components/Profile/MyPostList';

const cn = classNames.bind(styles);

interface MemberDataContainerPropsType {
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

  // const [selectedSort, setSelectedSort] = useState<
  //   'all' | 'followed' | 'myGeneration'
  // >('all');

  // const [selectedSort, setSelectedSort] = useState<SortType>('ALL');

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
          // selectedSort={selectedSort}
          // setSelectedSort={setSelectedSort}
          // isMyProfile
        >
          <div>미인증사용자입니다</div>
        </ContentContainer>
      </div>
    );
  }

  if (!memberData) {
    return <div>Lodading~~~~~</div>;
  }
  console.log('myPostList: ', myPostList);
  const renderContent = () => {
    switch (selectedOption) {
      case 'feed':
        return myFeedList ? (
          <MyFeedList feedList={myFeedList} />
        ) : (
          '작성된 글이 없습니다.'
        );
      case 'post':
        return myPostList ? (
          <MyPostList
            // selectedSort={}
            postList={myPostList}
          />
        ) : (
          '작성된 글이 없습니다.'
        );

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
        // selectedSort={selectedSort}
        // setSelectedSort={setSelectedSort}
        isMyProfile
      >
        {renderContent()}
      </ContentContainer>
    </div>
  );
}
