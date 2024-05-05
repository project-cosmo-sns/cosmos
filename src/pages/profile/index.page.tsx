import { useEffect, useState } from 'react';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEditModal from '@/components/Profile/ProfileEditModal';
import { MemberDataType, memberMockData } from '@/pages/profile/mockData';
import classNames from 'classnames/bind';
import styles from './MemberDataContainer.module.scss';
import ContentContainer from '@/components/Common/ContentContainer';
import { ContainerOptionType } from '@/@types/type';
import FeedList from '@/components/Feed/FeedList';
import PostList from '@/components/Post/PostList';
import ScrapList from '@/components/Common/ScrapList';
import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';
import { getFeedList } from '@/components/Feed/FeedList/api';
import { FeedListType, FeedDetailType } from '@/components/Feed/types';

const cn = classNames.bind(styles);

export const getServerSideProps = async () => {
  const feedList: FeedListType = await getFeedList();
  return {
    props: {
      feedList: feedList.data,
    },
  };
};

interface MemberDataContainerPropsType {
  feedList: FeedDetailType[];
}

export default function MemberDataContainer({
  feedList,
}: MemberDataContainerPropsType) {
  const [memberData, setMemberData] = useState<MemberDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  const memberId = 1; // 예시용 ID, 실제로는 동적으로 가져올 수 있음

  // 리액트쿼리 이용 GET 해옴
  // const { data, isPending, isSuccess, isError } =
  //   useQuery<MemberDataType | null>({
  //     queryKey: ['memberData', memberId],
  //     queryFn: () => {
  //       // memberId가 존재하면 '/profile/{memberId}', 아니면 '/profile/mine'
  //       const endpoint = memberId ? `/profile/${memberId}` : '/profile/mine';
  //       return fetchData({ param: endpoint });
  //     },
  //   });

  // useEffect(() => {
  //   if (data) {
  //     // const targetId=data.memberId
  //     // const targetMemberData = Array.isArray(data) ? data.find(member => member.id === targetId) : null;
  //     setMemberData(data);
  //     // 추가적인 작업 실행
  //   }
  // }, [data]);

  useEffect(() => {
    const targetId = 1;
    const targetMemberData = memberMockData.find(
      (member) => member.memberId === targetId,
    );
    if (targetMemberData !== undefined) {
      setMemberData(targetMemberData);
    } else {
      setMemberData(null);
    }
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case 'feed':
        return <FeedList feedList={feedList} />;
      case 'post':
        return <PostList selectedSort={selectedSort} isMyProfile />;
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
