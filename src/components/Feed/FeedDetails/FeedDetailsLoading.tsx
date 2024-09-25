import LoadingSpinner from '@/components/Common/LoadingSpinner';
import styles from './FeedDetailsLoading.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function FeedDetailsLoading() {
  return (
    <div className={cn('container')}>
      <LoadingSpinner />
    </div>
  );
}
