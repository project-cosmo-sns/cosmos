import AdminList from '@/components/Admin/AdminList';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function AdminPage() {
  return (
    <div className={cn('container')}>
      <AdminList />
    </div>
  );
}
