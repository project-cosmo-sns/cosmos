import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';
import { MemberDataType } from './types';
import { FeedListType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import getMyPostList from '@/components/Profile/MyPostList/api';
import getMyFeedList from '@/components/Profile/MyFeedList/api';

export async function fetchMemberData(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;

  // endpoint가 잘못됐을 가능성?
  // 아니 get 해올 때 cookie를 포스트, 피드에도 보내야하네....
  const endpoint = memberId ? `profile/${memberId}` : '/profile/mine';

  try {
    const res = await instance.get(endpoint, {
      headers: {
        Cookie: cookies,
      },
    });

    const memberData: MemberDataType = await res.data;
    // 임시로 endpoint 바꾼 상태인 데이터
    const myFeedList: FeedListType = await getMyFeedList(context);
    const myPostList: PostListType = await getMyPostList(context);

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
