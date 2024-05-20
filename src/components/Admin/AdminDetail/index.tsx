import styles from './AdminDetail.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import {
  AdminDetailProps,
  useAcceptMember,
  useDeclineMember,
} from '@/api/admin';

const cn = classNames.bind(styles);

export default function AdminDetail({
  memberId,
  generation,
  imageUrl,
  realName,
}: AdminDetailProps) {
  const acceptMember = useAcceptMember(memberId);
  const declineMember = useDeclineMember(memberId);

  const acceptClick = () => {
    acceptMember();
  };

  const declineClick = () => {
    declineMember();
  };

  return (
    <div className={cn('admin-detail-container')}>
      <div className={cn('image-container')}>
        <Image src={imageUrl} fill alt="인증이미지 " />
      </div>
      <div className={cn('text-wrapper')}>
        <h1> {realName}</h1>
        <p>{generation}기</p>
      </div>
      <div className={cn('button-container')}>
        <DefaultButton color="black-03" size="medium" onClick={acceptClick}>
          승인
        </DefaultButton>
        <DefaultButton color="red-01" size="medium" onClick={declineClick}>
          거절
        </DefaultButton>
      </div>
    </div>
  );
}
