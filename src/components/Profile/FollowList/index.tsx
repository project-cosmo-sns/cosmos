import styles from './FollowList.module.scss';
import classNames from 'classnames/bind';
import Modal from '@/components/Common/Layout/Modal';
import { FollowType } from './FollowMockData';
import Follow from './Follow';

const cn = classNames.bind(styles);

type FollowListType = {
  followListProps: {
    title: string;
    handleClick: React.Dispatch<React.SetStateAction<boolean>>;
    followData: FollowType[];
    modalOpen: boolean;
    isFollow: boolean;
  };
};

/**
 * @param {Object} followListProps - 컴포넌트에 전달되는 props
 * @param {string} title - 모달 제목
 * @param {React.Dispatch<React.SetStateAction<boolean>>} handleClick - X 아이콘 클릭시 모달을 닫아주기 위한 setState 함수
 * @param {FollowType[]} followData - 팔로워 또는 팔로잉 데이터 / followData->이porp에 팔로잉또는 팔로워 데이터 넣어서 사용
 * @param {boolean} modalOpen - 모달 on/off 여부 변수
 * @param {boolean} isFollow - 팔로우 버튼이 필요한지 여부/ true: 팔로우 버튼 , false: 삭제 버튼
 * @returns {JSX.Element} 팔로워 또는 팔로잉 리스트 JSX
 * mockData 예비용
 */

export default function FollowList({ followListProps }: FollowListType) {
  const { title, handleClick, followData, isFollow, modalOpen } =
    followListProps;

  return (
    <Modal title={title} toggleModal={handleClick} modalVisible={modalOpen}>
      <div className={cn('follow-container')}>
        {followData.map((follow) => (
          <Follow key={follow.id} isFollow={isFollow} {...follow} />
        ))}
      </div>
    </Modal>
  );
}
