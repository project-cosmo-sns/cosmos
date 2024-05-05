import instance from '@/api/axios';

interface EditComment {
  comment: string;
}

export async function editComment(
  feedId: number,
  commentId: number,
  data: EditComment,
) {
  await instance.patch(`feed/${feedId}/comment/${commentId}`, {
    content: data.comment,
  });
}
