import styles from './AdminList.module.scss';
import classNames from 'classnames/bind';
import AdminDetail from '../AdminDetail';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { AdminListProps } from '@/api/admin';
import fetchData from '@/api/fetchData';

const cn = classNames.bind(styles);

export default function AdminList() {
  const {
    data: adminDataResult,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll<AdminListProps>({
    queryKey: ['adminData'],
    fetchFunction: (page: number) =>
      fetchData({
        param: `/admin/authorization/list?order=DESC&page=${page}&take=10`,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });

  const adminDatas = adminDataResult?.pages ?? [];
  return (
    <div className={cn('admin-list-container')}>
      {adminDatas.map((adminData) =>
        adminData.data.map((admin) => (
          <AdminDetail key={admin.memberId} {...admin} />
        )),
      )}
      {!isFetchingNextPage && <div ref={ref} />}
    </div>
  );
}
