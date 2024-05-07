import instance from '@/api/axios';
import { EditCommentType } from '@/@types/type';

export async function patchComment(
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

export async function postLikeComment(feedId: number, commentId: number) {
  await instance.post(`feed/${feedId}/comment/${commentId}/like`);
}

export async function deleteLikeComment(feedId: number, commentId: number) {
  await instance.delete(`feed/${feedId}/comment/${commentId}/like`);
}
