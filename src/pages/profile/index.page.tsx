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
import { getFeedList } from '@/components/Feed/FeedList/api';
import { FeedListType, FeedDetailType } from '@/components/Feed/types';
import { getMyProfile } from './api';
import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';

const cn = classNames.bind(styles);

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // context.req.headers.cookie를 통해 쿠키 추출
  const { req } = context;
  const cookies = req.headers.cookie || '';

  // 다른 사용자면 (memberId값이 있으면) endpoint를 다른 사용자 페이지로
  const memberId = context.query.memberId;
  // https://local.cosmo-sns.com:3000/profile?memberId=1
  const endpoint = memberId ? `profile/${memberId}` : '/profile/mine';
  console.log(context.query);

  // 쿠키를 요청 헤더에 포함시켜 API 요청하기
  try {
    const res = await instance.get(endpoint, {
      headers: {
        Cookie: cookies,
      },
    });
    const memberData: MemberDataType = await res.data;

    // const memberData: any = await getMyProfile();
    const feedList: FeedListType = await getFeedList();

    return {
      props: {
        feedList: feedList.data,
        memberData,
      },
    };
  } catch (error) {
    console.error('API 호출 실패ㅠ', error);
    //   if (error.response && error.response.status === 401) {
    //     return {
    //       props: {
    //         uncertified: true,
    //       },
    //     };
    //   }
    //   return {
    //     props: {
    //       error: true,
    //     },
    //   }
    return {
      props: {
        feedList: [],
        memberData: null,
        error: true,
      },
    };
  }
};

interface MemberDataContainerPropsType {
  feedList: FeedDetailType[];
  memberData: MemberDataType;
  uncertified?: boolean;
  error?: boolean; // 일단 넣어둠
}

export default function MemberDataContainer({
  feedList,
  memberData,
  uncertified, // 미인증
  error,
}: MemberDataContainerPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');

  // const memberId = 1; // 예시용 ID, 실제로는 동적으로 가져올 수 있음
  // memberId가 있으면(남의프로필이면) 선택적으로 내려줄 수 있게.
  // 내려준 값을 쿼리값으로 넣어서 띄울 수 있게 하기

  useEffect(() => {});

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

  if (uncertified || error) {
    return (
      <div>
        {memberData && (
          <>
            <ProfileHeader
              memberData={memberData}
              setIsModalOpen={setIsModalOpen}
              uncertified
            />
            <ContentContainer
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              isMyProfile
            >
              {renderContent()}
            </ContentContainer>
          </>
        )}
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
          {/* 현재는 memberData가 없으면 그냥 guest인데, 
        어차피 guest는 프로필 접근이 불가능하다. 
        미인증/인증 사용자만 있음 
        -> 
        인증 사용자인가? -> 사용자 정보 전부 출력, 세팅 버튼
        미인증 사용자인가? -> 사용자 정보 출력, 인증하기 버튼만 나오면 됨 */}

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
