// eslint-disable-next-line import/no-cycle
import { InfiniteDataRefetchType } from '@/@types/type';
import { CommentListType } from '@/components/Feed/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';
import fetchData from '@/api/fetchData';

export interface PostCommentType {
  content: string;
}

export function useReplyRequest(
  isPost: boolean,
  id: number,
  commentId: number,
  replyId?: number,
) {
  const queryClient = useQueryClient();
  const { showToastHandler } = useToast();

  const { mutate: writeReplyMutate } = useMutation({
    mutationFn: (replyValue: string) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/comment/${commentId}/write`,
        method: 'post',
        requestData: {
          content: replyValue,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
      });
    },
    onError: async () => {
      showToastHandler('댓글 작성 실패', 'warn');
    },
  });

  const { mutate: editReplyMutate } = useMutation({
    mutationFn: (data: string) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/reply/${replyId}/modify`,
        method: 'patch',
        requestData: {
          content: data,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
      });
      showToastHandler('댓글 수정 완료', 'check');
    },
    onError: async () => {
      showToastHandler('댓글 수정 실패', 'warn');
    },
  });

  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/reply/${replyId}`,
        method: 'delete',
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
      });
      showToastHandler('삭제 완료', 'check');
    },
    onError: async () => {
      showToastHandler('댓글 삭제 실패', 'warn');
    },
  });

  return { writeReplyMutate, editReplyMutate, deleteReplyMutate };
}
