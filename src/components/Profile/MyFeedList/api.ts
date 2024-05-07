import instance from '@/api/axios';
import { GetServerSidePropsContext } from 'next/types';

export default async function getMyFeedList(
  context: GetServerSidePropsContext,
) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;

  const feedData = await instance.get('/profile/mine/feed', {
    headers: {
      Cookie: cookies,
    },
    // withCredentials: true,
  });
  return feedData.data;
}
