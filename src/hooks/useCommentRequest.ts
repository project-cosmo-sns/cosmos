// eslint-disable-next-line import/no-cycle
import { Comment } from '@/components/Common/CommentInput';
import { EditCommentType, InfiniteDataRefetchType } from '@/@types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { CommentListType } from '@/components/Feed/types';

export interface PostCommentType {
  content: string;
}

export function useCommentRequest(
  postId: number,
  forFeeds: boolean,
  refetch?: InfiniteDataRefetchType<CommentListType>,
) {
  const queryClient = useQueryClient();

  const { mutate: postCommentMutate } = useMutation({
    mutationFn: (dataParam: Comment) =>
      fetchData<PostCommentType>({
        param: `${forFeeds ? 'feed' : 'post'}/${postId}/comment/${forFeeds ? '' : 'write'}`,
        method: 'post',
        requestData: {
          content: dataParam.comment,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['feedComments'] });
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${postId}/comment/${commentId}`,
        method: 'delete',
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['feedComments'] });
    },
  });

  const deleteCommentRequest = (commentId: number) => {
    deleteCommentMutate(commentId);
  };

  const { mutate: postLikeCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${postId}/comment/${commentId}/like`,
        method: 'post',
      }),
  });

  const postLikeRequest = (commentId: number) => {
    postLikeCommentMutate(commentId);
  };

  const { mutate: deleteLikeCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${postId}/comment/${commentId}/like`,
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
        param: `${forFeeds ? 'feed' : 'post'}/${postId}/comment/${commentId}/${forFeeds ? '' : 'modify'}`,
        method: 'patch',
        requestData: {
          content: data.editedComment,
        },
      }),
    onSuccess: async () => {
      if (refetch) {
        await refetch();
      }
    },
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
    postCommentMutate,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  };
}
