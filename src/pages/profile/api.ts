import { GetServerSidePropsContext } from 'next';
import instance from '@/api/axios';
import { getFeedList } from '@/components/Feed/FeedList/api';
import { MemberDataType } from './types';
import { FeedListType } from '@/components/Feed/types';

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
    const feedList: FeedListType = await getFeedList();

    return {
      props: {
        feedList: feedList.data,
        memberData,
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
