import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';
import { MemberDataType } from './types';
import { FeedDetailType, FeedListType } from '@/components/Feed/types';
import { PostListDataType, PostListType } from '@/components/Post/types';
import getMyPostList from '@/components/Profile/MyPostList/api';
import getMyFeedList from '@/components/Profile/MyFeedList/api';
import getMyScrapList from '@/components/Profile/MyScrapList/api';

export async function fetchMemberData(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    myFeedList: FeedDetailType[];
    myPostList: PostListDataType[];
    myScrapList: PostListDataType[];
    memberData: MemberDataType;
  };
}> {
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
    const myPostList: PostListType = await getMyPostList(context);
    const myScrapList: PostListType = await getMyScrapList(context);

    return {
      props: {
        myFeedList: myFeedList.data,
        myPostList: myPostList.data,
        myScrapList: myScrapList.data,
        memberData,
      },
    };
  } catch (error) {
    console.error('API 호출 실패ㅠ', error);
    return {
      props: {
        myFeedList: [],
        myPostList: [],
        myScrapList: [],
        memberData: {
          nickname: '',
          introduce: '',
          profileImageUrl: '',
          generation: 0,
          followerCount: 0,
          followingCount: 0,
          authorizationStatus: 'NONE',
        },
      },
    };
  }
}
