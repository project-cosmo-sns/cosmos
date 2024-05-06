import instance from '@/api/axios';

export interface EditCommentType {
  editedComment: string;
}

export async function PatchComment(
  feedId: number,
  commentId: number,
  data: EditCommentType,
) {
  await instance.patch(`feed/${feedId}/comment/${commentId}`, {
    content: data.editedComment,
  });
}

export async function deleteComment(feedId: number, commentId: number) {
  await instance.delete(`feed/${feedId}/comment/${commentId}`);
}
