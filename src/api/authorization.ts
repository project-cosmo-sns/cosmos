import { useMutation } from '@tanstack/react-query';
import fetchData from './fetchData';
import { AuthFormProps } from '@/@types/type';

/**
 *  회원인증 데이터 전송
 * @returns
 */

export function useSendAuthData() {
  const { mutate: sendAuth } = useMutation({
    mutationFn: (data: AuthFormProps) =>
      fetchData({
        param: '/authorization',
        method: 'post',
        requestData: {
          generation: data.generation,
          image: data.image,
        },
      }),
  });
  return sendAuth;
}

export function useDeleteAuthData() {
  const { mutate: deleteAuth } = useMutation({
    mutationFn: () =>
      fetchData({
        param: '/authorization/iamge/delete',
        method: 'delete',
      }),
  });
  return deleteAuth;
}
