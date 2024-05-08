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

  const endpoint = memberId ? `profile/${memberId}` : '/profile/mine';

  try {
    const res = await instance.get(endpoint, {
      headers: {
        Cookie: cookies,
      },
    });

    const memberData: MemberDataType = await res.data;
    const myFeedList: FeedListType = await getMyFeedList(context);
    // 포스트 리스트는 에러 나는중...!
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
