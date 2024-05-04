import instance from '@/api/axios';

export async function postComment(data, feedId: number) {
  await instance.post(`feed/${feedId}/comment`, {
    content: data.comment,
  });
}
