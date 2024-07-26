import { Writer } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import styles from './WriterProfile.module.scss';
import GenerationBadge from '../GenerationBadge';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
import { useDispatch } from 'react-redux';
import { handleFeedDetailModal } from '@/redux/feedDetailModalSlice';

interface WriterProfileProps {
  writer: Writer;
  createdAt?: string;
  setIsNotificationFeedModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const cn = classNames.bind(styles);

export default function WriterProfile({
  writer,
  createdAt,
  setIsNotificationFeedModalOpen,
}: WriterProfileProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id: memberId, nickname, profileImageUrl, generation } = writer;

  const { checkMemberStatus } = useFetchMemberStatus();

  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={40}
        height={40}
        onClick={(event) => {
          event.stopPropagation();
          // 전역으로 관리하는 피드 상세 모달 닫기
          dispatch(handleFeedDetailModal(false));
          // notification 컴포넌트에서 관리하는 피드 상세 모달 닫기
          if (setIsNotificationFeedModalOpen)
            setIsNotificationFeedModalOpen(false);
          checkMemberStatus(() => router.push(`/profile?memberId=${memberId}`));
        }}
      />
      <div className={cn('info')}>
        <button
          type="button"
          className={cn('nickname')}
          onClick={(event) => {
            event.stopPropagation();
            // 전역으로 관리하는 피드 상세 모달 닫기
            dispatch(handleFeedDetailModal(false));
            // notification 컴포넌트에서 관리하는 피드 상세 모달 닫기
            if (setIsNotificationFeedModalOpen)
              setIsNotificationFeedModalOpen(false);
            checkMemberStatus(() =>
              router.push(`/profile?memberId=${memberId}`),
            );
          }}
        >
          {nickname}
        </button>
        <GenerationBadge generationInfo={generation} />
      </div>
      <span className={cn('created-at')}>{createdAt}</span>
    </div>
  );
}
