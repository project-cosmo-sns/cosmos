import { PostCommentType } from '@/components/Common/CommentInput/api';
import { Comment } from '@/components/Common/CommentInput';
import { EditCommentType } from '@/@types/type';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

export function useCommentRequest(postId: number) {
  const { mutate: postCommentMutate } = useMutation({
    mutationFn: (dataParam: Comment) =>
      fetchData<PostCommentType>({
        param: `feed/${postId}/comment`,
        method: 'post',
        requestData: {
          content: dataParam.comment,
        },
      }),
  });

  const onSubmit = (data: Comment) => {
    postCommentMutate(data);
  };

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `feed/${postId}/comment/${commentId}`,
        method: 'delete',
      }),
  });

  const deleteCommentRequest = (commentId: number) => {
    deleteCommentMutate(commentId);
  };

  const { mutate: postLikeCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `feed/${postId}/comment/${commentId}/like`,
        method: 'post',
      }),
  });

  const postLikeRequest = (commentId: number) => {
    postLikeCommentMutate(commentId);
  };

  const { mutate: deleteLikeCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `feed/${postId}/comment/${commentId}/like`,
        method: 'delete',
      }),
  });

  const deleteLikeRequest = (commentId: number) => {
    deleteLikeCommentMutate(commentId);
  };

  const { mutate: patchCommentMutate } = useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: EditCommentType;
    }) =>
      fetchData({
        param: `feed/${postId}/comment/${commentId}`,
        method: 'patch',
        requestData: {
          content: data.editedComment,
        },
      }),
  });

  const editCommentRequest = ({
    commentId,
    data,
  }: {
    commentId: number;
    data: EditCommentType;
  }) => {
    patchCommentMutate({ commentId, data });
  };

  return {
    onSubmit,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  };
}
