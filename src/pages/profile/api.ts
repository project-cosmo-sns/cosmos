import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';
import { MemberDataType } from './types';
import { FeedListType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import getMyPostList from '@/components/Profile/MyPostList/api';
import { getMyFeedList } from '@/components/Profile/MyFeedList/api';

export async function fetchMemberData(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;

  // 엔드포인트 로직 바꿀 것. 둘 다 memberId생겨서 구분 불가함
  // 그럼 나인지 아닌지 구분을 어떻게 하나?
  // 나인지 아닌지 구분할 필요가 있나? 있다...
  // 맞다. mine에는 memberId 굳이 안내려주기로햇다. 바본가ㅎ
  const endpoint = memberId ? `profile/${memberId}` : '/profile/mine';

  try {
    const res = await instance.get(endpoint, {
      headers: {
        Cookie: cookies,
      },
    });

    const memberData: MemberDataType = await res.data;
    // 임시로 endpoint 바꾼 상태인 데이터
    const myFeedList: FeedListType = await getMyFeedList();
    const myPostList: PostListType = await getMyPostList();

    return {
      props: {
        myFeedList: myFeedList.data,
        myPostList: myPostList.data,
        memberData,
      },
    };
  } catch (error) {
    console.error('API 호출 실패ㅠ', error);
    return {
      props: {
        feedList: [],
        postList: [],
        memberData: null,
        error: true,
      },
    };
  }
}
