import fetchData from './fetchData';
import { useQuery } from '@tanstack/react-query';

type ProfileData = {
  profileImageUrl: string;
  status: number;
};

export default function useGetProfileImage() {
  return useQuery({
    queryKey: ['profileImage'],
    queryFn: () =>
      fetchData<ProfileData>({
        param: '/member/profile-image-url',
      }),
  });
}
