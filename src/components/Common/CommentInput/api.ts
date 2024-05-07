import instance from '@/api/axios';
import { Comment } from '@/components/Common/CommentInput/index';

export async function postComment(data: Comment, feedId: number) {
  await instance.post(`feed/${feedId}/comment`, {
    content: data.comment,
  });
}
