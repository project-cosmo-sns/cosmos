import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import PopOver from '../PopOverBox';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ onClose }: PopOverProps) {
  return (
    <PopOver onClose={onClose} className={cn('add-popover')}>
      <ul className={cn('content-list-wrapper')}>
        <li className={cn('content-list')}>
          <FeedIcon width="18" height="18" />
          <span>피드 작성하기</span>
        </li>
        <li className={cn('content-list')}>
          <PostIcon width="18" height="18" fill="#363636" />
          <span>포스트 작성하기</span>
        </li>
      </ul>
    </PopOver>
  );
}
