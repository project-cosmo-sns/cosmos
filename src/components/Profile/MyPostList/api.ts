import instance from '@/api/axios';
import { PostListType } from '@/components/Post/types';
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

  const postData: PostListType = await instance.get(endpoint, {
    headers: {
      Cookie: cookies,
    },
    // withCredentials: true,
  });
  return postData;
}
