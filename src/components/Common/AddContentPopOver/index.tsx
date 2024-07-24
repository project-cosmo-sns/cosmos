import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import PopOver from '../PopOverBox';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateFeedModal } from '@/redux/createFeedModalSlice';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/useToast';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ onClose }: PopOverProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToastHandler } = useToast();
  const isCreateFeedModalOpen = useSelector(
    (state: RootState) => state.feedModal.isOpen,
  );

  const handleCreateFeedClick = () => {
    if (!isCreateFeedModalOpen) {
      dispatch(handleCreateFeedModal(true));
    } else {
      // 모바일에서는 하단 메뉴 바가 보이기 때문에 '피드 생성하기' 버튼을 한번 더 누를 수 있음.
      showToastHandler('피드를 작성 중입니다.', 'warn');
    }
    onClose();
  };

  const handleCreatePostClick = () => {
    if (!isCreateFeedModalOpen) {
      router.push('/write');
    } else {
      // 피드 작성 모달이 떠잇는데 포스트 작성을 클릭할 경우 토스트 메세지 출력
      showToastHandler('피드를 작성 중입니다.', 'warn');
    }
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
