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
import MyPostList from '@/components/Profile/MyPostList';
import { PostListDataType } from '@/components/Post/types';

import { SortType } from '@/constants/sortType';

const cn = classNames.bind(styles);

interface MemberDataContainerPropsType {
  myFeedList: FeedDetailType[];
  myPostList: PostListDataType[];
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
  console.log('1memberData', memberData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');

  // const [selectedSort, setSelectedSort] = useState<
  //   'all' | 'followed' | 'myGeneration'
  // >('all');

  const [selectedSort, setSelectedSort] = useState<SortType>('ALL');

  // 현재는 다른 유저일 경우 인증/미인증을 알 수 없어서 전부 미인증으로 뜨는 상태.
  // api를 새로 내려받게 되면 다시 처리할 것.

  // 왜 이게 null 처리가 자꾸 되는걸까? memberData 왜 없지?
  // 다른 사용자의 경우엔 아직 isAuthorized 값이 없어서?. -> 생겼넴;
  // 왜 memberData가 null로 내려오는 경우가 생겼을까?
  if (!memberData || !memberData.isAuthorized || error) {
    // ..... endpoint 바꾸니까 memberData가 잘 내려온다.
    // 임시로 바꿔서 받아오기로 함.
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
