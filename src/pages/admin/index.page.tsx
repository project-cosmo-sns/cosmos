import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';

export default function AdminPage() {
  const cn = classNames.bind(styles);

  return (
    <>
      <div className={cn('title')}>가입 승인 목록</div>
      <div className={cn('wrapper')}>
        <div className={cn('list-header')}>
          <div>이름</div>
          <div>기수</div>
          <div>코드잇 인증</div>
        </div>
        <div className={cn('list')}>
          {' '}
          <div>김냥냥</div>
          <div>3기</div>
          <DefaultButton
            size="small"
            color="$white-01"
            onClick={() => {
              console.log('승인했당');
            }}
          >
            수락하기
          </DefaultButton>
          <DefaultButton
            size="small"
            color="$red-01"
            onClick={() => {
              console.log('승인했당');
            }}
          >
            거절하기
          </DefaultButton>
        </div>
        <div className={cn('list')}>대기중</div>
      </div>
    </>
  );
}
