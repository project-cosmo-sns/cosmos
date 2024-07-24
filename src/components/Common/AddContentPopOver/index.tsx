import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import PopOver from '../PopOverBox';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { handleCreateFeedModal } from '@/redux/createFeedModalSlice';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ onClose }: PopOverProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateFeedClick = () => {
    dispatch(handleCreateFeedModal(true));
    onClose();
  };

  const handleCreatePostClick = () => {
    router.push('/write');
    onClose();
  };

  return (
    <>
      <PopOver onClose={onClose} className={cn('add-popover')}>
        <ul className={cn('content-list-wrapper')}>
          <li
            role="presentation"
            className={cn('content-list', 'feed')}
            onClick={() => handleCreateFeedClick()}
          >
            <FeedIcon width="18" height="18" fill="#FFFFFF" />
            <span>피드 작성하기</span>
          </li>
          <li
            className={cn('content-list', 'post')}
            onClick={handleCreatePostClick}
          >
            <PostIcon width="18" height="18" fill="#FFFFFF" />
            <span className={cn('post-span')}>포스트 작성하기</span>
          </li>
        </ul>
      </PopOver>
    </>
  );
}
