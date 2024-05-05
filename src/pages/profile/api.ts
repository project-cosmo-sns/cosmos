import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';
import { getFeedList } from '@/components/Feed/FeedList/api';
import { MemberDataType } from './types';
import { FeedListType } from '@/components/Feed/types';
import { PostListInfoType } from '@/components/Post/types';

// 내가 쓴 글이 자주 바뀌지 않을 것 같아서
// 내가 쓴 글까지 SSR 처리 해주기로..... 일단은.
export async function fetchMemberData(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;
  // const endpoint = memberId ? `profile/${memberId}` : '/profile/mine';

  let endpoint = '/profile/mine';
  // 로그인한 사용자의 memberId와 요청된 memberId가 동일할 경우 혹은 memberId가 없을 경우
  // 내 프로필 정보를 가져옵니다.
  // 다른 사용자의 memberId일 경우 해당 사용자의 프로필 정보를 가져옵니다.
  if (memberId) {
    endpoint = `profile/${memberId}`;
  }

  // export async const getPostsData = (memberId: string) => {
  //   const endpoint = `posts/${memberId}`; // 포스트 데이터를 가져오는 API 엔드포인트
  //   const postsData: PostListInfoType[] = await fetchData<PostListInfoType[]>({
  //     param: endpoint,
  //   });
  //   return postsData;
  // }

  async function getPostList() {
    const postData = await instance.get('/post/list');
    return postData.data;
  }

  try {
    const res = await instance.get(endpoint, {
      headers: {
        Cookie: cookies,
      },
    });
    const memberData: MemberDataType = await res.data;
    const feedList: FeedListType = await getFeedList();
    const postList: PostListInfoType = await getPostList();

    // // memberId가 존재하면 otherMemberData로, 그렇지 않으면 memberData로
    // // memberData에 memberId가 생기면 없어질 로직
    // const props = memberId
    //   ? {
    //       feedList: feedList.data,
    //       otherMemberData: memberData,
    //     }
    //   : {
    //       feedList: feedList.data,
    //       memberData: memberData,
    //     };

    return {
      props: {
        feedList: feedList.data,
        postList,
        memberData, // 현재 로그인한 사용자 또는 조회된 사용자의 데이터
      },
    };
  } catch (error) {
    console.error('API 호출 실패ㅠ', error);
    return {
      props: {
        feedList: [],
        memberData: null,
        error: true,
      },
    };
  }
}
