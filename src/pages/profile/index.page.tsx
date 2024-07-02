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
import { FeedListType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import ProfileContent from '@/components/Profile/ProfileContent/ProfileContent';
import EmptyContent from '@/components/Profile/ProfileContent/EmptyContent';
import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axios';

const cn = classNames.bind(styles);

export interface MemberDataContainerPropsType {
  myFeedList: FeedListType;
  myPostList: PostListType;
  myScrapList: PostListType;
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
  myScrapList,
  error,
}: MemberDataContainerPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const isMine = !memberData.memberId;

  // SSR로 가져온 데이터를 쿼리 데이터로 저장 (mutation 후 리패치 위한 작업)

  const { data } = useQuery({
    queryKey: ['memberData', memberData.memberId], // 사용자 ID 포함시키게 변경
    queryFn: async () => {
      // 이게 어떤 애인지 알아보기
      const endpoint = isMine
        ? '/profile/mine'
        : `/profile/${memberData.memberId}`;
      const res = await instance.get(endpoint, {});
      const fetchedMemberData: MemberDataType = await res.data;
      return fetchedMemberData;
    },
    initialData: memberData,
    enabled: !!memberData,
    // 서버에서 가져온 데이터는 여기서 처리
    // 자주 바뀌지 않는다고 SSR을 사용하는건 아님
    // 서버사이드에서 fetch 끝냈는데 클라이언트에서 한번 더 fetch중..  -> 안됨
    // 서버사이드에서 데이터를 가져올 떄 쿼리를 사용해서 가져옴 - 쿼리 정보를 클라이언트로 넘겨줌
    // SSR 쪽에 코드를 추가 수정할 필요 있음. .
    // 클라이언트엔 이미 쿼리 정보가 있으니까 서버사이드에서 가져왔딴걸 알게됨
    // 하이드레이션 / 디하이드레이션 과정이 있다. - 다시 패치할지 말지 알려주는 과정이 필요함.
    // react query SSR...
  });

  if (!memberData) {
    return <div>Lodading~~~~~</div>;
  } // 로딩페이지 만들면 좋겠다.

  return (
    <div className={cn('profile')}>
      {memberData && (
        <>
          <ProfileHeader
            memberData={memberData.memberId ? memberData : data}
            setIsModalOpen={setIsModalOpen}
          />
          <ProfileEditModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            memberData={memberData}
            initialData={memberData}
          />
        </>
      )}
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isMyProfile={isMine}
      >
        <div className={cn('profile-content')}>
          {memberData.authorizationStatus === 'ACCEPT' && (
            <ProfileContent
              selectedOption={selectedOption}
              myFeedList={myFeedList}
              myPostList={myPostList}
              myScrapList={myScrapList}
              memberData={memberData}
            />
          )}
          {memberData.authorizationStatus === 'NONE' && (
            <EmptyContent selectedOption={selectedOption} />
          )}
        </div>
      </ContentContainer>
    </div>
  );
}
