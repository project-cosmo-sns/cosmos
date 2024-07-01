// eslint-disable-next-line import/no-cycle
import { Comment } from '@/components/Common/CommentInput';
import { EditCommentType, InfiniteDataRefetchType } from '@/@types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { CommentListType } from '@/components/Feed/types';
import { useToast } from './useToast';

export interface PostCommentType {
  content: string;
}

export function useCommentRequest(
  id: number,
  forFeeds: boolean,
  refetch?: InfiniteDataRefetchType<CommentListType>,
) {
  const queryClient = useQueryClient();
  const { showToastHandler } = useToast();

  const { mutate: postCommentMutate } = useMutation({
    mutationFn: (dataParam: string) =>
      fetchData<PostCommentType>({
        param: `${forFeeds ? 'feed' : 'post'}/${id}/comment/${forFeeds ? '' : 'write'}`,
        method: 'post',
        requestData: {
          content: dataParam,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [forFeeds ? 'feedComments' : 'postComments'],
      });
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${id}/comment/${commentId}`,
        method: 'delete',
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [forFeeds ? 'feedComments' : 'postComments'],
      });
      showToastHandler('댓글 삭제 완료!', 'check');
    },
  });

  const deleteCommentRequest = (commentId: number) => {
    deleteCommentMutate(commentId);
  };

  const { mutate: postLikeCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${id}/comment/${commentId}/like`,
        method: 'post',
      }),
  });

  const postLikeRequest = (commentId: number) => {
    postLikeCommentMutate(commentId);
  };

  const { mutate: deleteLikeRequest } = useMutation({
    mutationFn: (commentId: number) =>
      fetchData<void>({
        param: `${forFeeds ? 'feed' : 'post'}/${id}/comment/${commentId}/like`,
        method: 'delete',
      }),
  });

  const { mutate: editCommentRequest } = useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: EditCommentType;
    }) =>
      fetchData({
        param: `${forFeeds ? 'feed' : 'post'}/${id}/comment/${commentId}/${forFeeds ? '' : 'modify'}`,
        method: 'patch',
        requestData: {
          content: data.editedComment,
        },
      }),
    onSuccess: async () => {
      showToastHandler('댓글 수정 완료!', 'check');
      queryClient.invalidateQueries({
        queryKey: [forFeeds ? 'feedComments' : 'postComments'],
      });
    },
  });

  return {
    postCommentMutate,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  };
}
