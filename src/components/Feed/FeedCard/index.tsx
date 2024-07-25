import fetchData from '@/api/fetchData';
import DeleteModal from '@/components/Common/DeleteModal';
import DetailImageModal from '@/components/Common/DetailImageModal';
import EmojiBundle from '@/components/Common/EmojiBundle';
import { DeleteIcon, EditIcon } from '@/components/Common/IconCollection';
import WriterProfile from '@/components/Common/WriterProfile';
import { useImageDetail } from '@/hooks/useImageDetail';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import getElapsedTime from '@/utils/getElaspedTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { FeedDetailType } from '../types';
import styles from './FeedCard.module.scss';
import TextWithLinks from '@/components/Common/TextWithLinks';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { handleFeedDetailModal } from '@/redux/feedDetailModalSlice';

interface FeedCardTypes {
  feedData: FeedDetailType;
  hasPadding: boolean;
  forDetails?: boolean;
  onClick?: () => void;
  editState?: boolean;
  toggleEditMode?: Dispatch<SetStateAction<boolean>>;
  setIsNotificationFeedModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const cn = classNames.bind(styles);

/**
 * @param {FeedData} feedData - 서버사이드 렌더링, getServerSideProps에서 getFeedList 요청에서 받아온 데이터입니다.
 * @param {boolean} modalVisible - 상위 컴포넌트의 모달 출력 여부 상태 변수입니다.
 * @param {Dispatch<SetStateAction<boolean>>} toggleModal - 상위 컴포넌트의 모달 출력 상태를 설정하는 세터함수입니다.
 * @param {boolean} hasPadding - 피드 상세와 피드 리스트 패딩 값이 달라 만들었습니다.
 * @param {boolean} hasHover - 피드 상세와 피드 리스트에서의 호버 여부가 달라 만들어줬습니다.
 * @return {JSX.Element} FeedCard - 사용자 프로필, 사용자가 생성한 내용, 감정을 남길수 있는 컴포넌트 포함된 컴포넌트입니다.
 */

export default function FeedCard({
  feedData,
  hasPadding,
  forDetails,
  onClick,
  editState,
  toggleEditMode,
  setIsNotificationFeedModalOpen,
}: FeedCardTypes) {
  const {
    currentImageUrl,
    isImageModalVisible,
    showImageDetail,
    hideImageDetail,
  } = useImageDetail();
  const {
    id: feedId,
    content,
    viewCount,
    commentCount,
    createdAt,
    imageUrls,
    isMine,
    emojis,
  } = feedData.feed;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageLoading, setImageLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deleteMutaion = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/feed/${feedId}`,
        method: 'delete',
      }),
    onSuccess: () => {
      dispatch(handleFeedDetailModal(false));
      router.push('/?tab=feed');
      queryClient.invalidateQueries({
        queryKey: ['feedList'],
      });
    },
  });

  const { handleEmojiClick, isAddPending, isDeletePending } =
    useSendEmojiRequest({
      id: feedId as number,
      isPost: false,
    });

  return (
    <div
      className={cn(
        'container',
        hasPadding && 'padding',
        forDetails || 'container-hover',
      )}
    >
      <div className={cn('wrapper')}>
        <div className={cn('user-content')} onClick={onClick}>
          <div className={cn('profile-content-wrapper')}>
            <div className={cn('profile-content-divide')}>
              <WriterProfile
                writer={feedData.writer}
                createdAt={getElapsedTime(createdAt)}
                setIsNotificationFeedModalOpen={setIsNotificationFeedModalOpen}
              />
              {forDetails && isMine && (
                <div className={cn('icon-wrapper')}>
                  <EditIcon
                    width="18"
                    height="18"
                    onClick={() => {
                      toggleEditMode && toggleEditMode(!editState);
                    }}
                  />
                  <DeleteIcon
                    width="18"
                    height="18"
                    onClick={() => setIsDeleteModalOpen(true)}
                  />
                </div>
              )}
            </div>
            {forDetails && !!imageUrls?.length && (
              <div className={cn('detail-upload-image-wrapper')}>
                {imageUrls.map((url: string, index) => (
                  <div
                    key={index}
                    className={cn('detail-upload-image')}
                    onClick={() => showImageDetail(url)}
                  >
                    <Image
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                      fill
                      onLoad={() => setImageLoading(false)}
                      className={cn(
                        'image-item',
                        isImageLoading ? 'blur' : 'remove-blur',
                      )}
                      style={{ objectFit: 'cover' }}
                      src={url}
                      sizes="33vw"
                      priority
                      alt="feedImage"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className={cn('content', forDetails || 'content-hidden')}>
              <TextWithLinks text={content} />
            </div>
          </div>
          {forDetails ||
            (!!imageUrls?.length && (
              <div className={cn('upload-image-wrapper')}>
                <div className={cn('upload-image')}>
                  <Image
                    className={cn('image-tag')}
                    sizes="33vw"
                    fill
                    style={{ objectFit: 'cover' }}
                    src={`${imageUrls[0]}`}
                    alt="feedImage"
                    priority
                  />
                </div>
                {imageUrls.length > 1 && (
                  <span className={cn('extra-stuff')}>
                    + {imageUrls.length - 1}
                  </span>
                )}
              </div>
            ))}
        </div>
        <EmojiBundle
          commentCount={commentCount}
          viewCount={viewCount}
          emojiList={emojis}
          handleEmojiClick={handleEmojiClick}
          isPending={isAddPending || isDeletePending}
        />
      </div>
      <DeleteModal
        title="삭제"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={() => {
          setIsDeleteModalOpen(!isDeleteModalOpen);
          deleteMutaion.mutate();
        }}
      />
      <DetailImageModal
        currentImageUrl={currentImageUrl}
        isImageModalVisible={isImageModalVisible}
        hideImageDetail={hideImageDetail}
      />
    </div>
  );
}
