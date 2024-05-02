import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';
import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import Modal from '@/components/Common/Layout/Modal';
import { FeedData } from '../FeedList/mockData';
import { useRouter } from 'next/router';

interface FeedCardTypes {
  feedData: FeedData;
  modalVisible?: boolean;
  toggleModal?: Dispatch<SetStateAction<boolean>>;
  hasPadding: boolean;
  forDetails?: boolean;
}

/**
 * @param {FeedData} feedData - 임시로 만든 목데이터 입니다. api 가 완성되면 교체해줄 예정입니다.
 * @param {boolean} modalVisible - 상위 컴포넌트의 모달 출력 여부 상태 변수입니다.
 * @param {Dispatch<SetStateAction<boolean>>} toggleModal - 상위 컴포넌트의 모달 출력 상태를 설정하는 세터함수입니다.
 * @param {boolean} hasPadding - 피드 상세와 피드 리스트 패딩 값이 달라 만들었습니다.
 * @param {boolean} hasHover - 피드 상세와 피드 리스트에서의 호버 여부가 달라 만들어줬습니다.
 * @return {JSX.Element} FeedCard - 사용자 프로필, 사용자가 생성한 내용, 감정을 남길수 있는 컴포넌트 포함된 컴포넌트입니다.
 */

export default function FeedCard({
  feedData,
  modalVisible = false,
  toggleModal,
  hasPadding,
  forDetails,
}: FeedCardTypes) {
  const cn = classNames.bind(styles);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const router = useRouter();
  const {
    id,
    author,
    createdAt,
    content,
    images,
    reactionCount,
    commentsCount,
    eyeCount,
  } = feedData;
  const [emojiVisible, setEmojiVisible] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'container',
        hasPadding && 'padding',
        forDetails || 'container-hover',
      )}
    >
      <div className={cn('wrapper')}>
        <div
          className={cn('user-content')}
          onClick={async () => {
            await router.push(`?id=${id}`);
            toggleModal && toggleModal(!modalVisible);
          }}
        >
          <div className={cn('profile-content-wrapper')}>
            <AuthorProfile author={author} createdAt={createdAt} />
            <div className={cn('content')}>{content}</div>
          </div>
          {images && (
            <div className={cn('upload-image-wrapper')}>
              <div className={cn('upload-image')}>
                <Image
                  fill
                  objectFit="cover"
                  src={images[0].imageUrl}
                  alt="feedImage"
                />
              </div>
              {images.length > 1 && (
                <span className={cn('extra-stuff')}>+ {images.length - 1}</span>
              )}
            </div>
          )}
        </div>
        <ReactionContainer
          emoji={reactionCount}
          commentsCount={commentsCount}
          views={eyeCount}
          emojiVisible={emojiVisible}
          handleEmojiClick={setEmojiVisible}
          forDetails={forDetails}
        />
        {hasPadding || (
          <div>
            <button
              type="button"
              onClick={() => setMoreModalOpen(!moreModalOpen)}
            >
              모달 생성
            </button>
            <Modal
              title="임시모달"
              cssModalSize={cn('')}
              cssComponentDisplay={cn('')}
              modalVisible={moreModalOpen}
              toggleModal={setMoreModalOpen}
            >
              <div>테스트 모달</div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
