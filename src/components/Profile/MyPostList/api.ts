import instance from '@/api/axios';
import { GetServerSidePropsContext } from 'next/types';

export default async function getMyPostList(
  context: GetServerSidePropsContext,
) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;

  const endpoint = memberId
    ? `/profile/${memberId}/post`
    : '/profile/mine/post';

  const postData = await instance.get(endpoint, {
    headers: {
      Cookie: cookies,
    },
    // withCredentials: true,
  });
  return postData.data;
}
