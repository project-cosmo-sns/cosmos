import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import PopOver from '../PopOverBox';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';

type PopOverProps = {
  popOverRef: React.RefObject<HTMLDivElement>;
  items: string[];
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ popOverRef, items }: PopOverProps) {
  return (
    <PopOver popOverRef={popOverRef}>
      <ul>
        <li className={cn('content-list')}>
          <FeedIcon />
          <span>피드 작성하기</span>
        </li>
        <li className={cn('content-list')}>
          <PostIcon />
          <span>포스트 작성하기</span>
        </li>
      </ul>
    </PopOver>
  );
}
