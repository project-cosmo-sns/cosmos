import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from './fetchData';
import { metaType } from '@/@types/type';

export type AdminDetailProps = {
  memberId?: string;
  nickname: string;
  generation: number;
  imageUrl: string;
  createdAt?: string;
};

export type AdminListProps = {
  data: AdminDetailProps[];
  meta: metaType;
};

export async function getAdminList(page = 1) {
  const res = await fetchData<AdminDetailProps>({
    param: `/admin/authorization/list?order=DESC&page=${page}&take=10`,
  });
}

export function useAcceptMember(memberId: string | undefined) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/admin/${memberId}/accept`,
        method: 'post',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminData'] });
    },
  });
  return mutate;
}

export function useDeclineMember(memberId: string | undefined) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/admin/${memberId}/decline`,
        method: 'post',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminData'] });
    },
  });
  return mutate;
}
