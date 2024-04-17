/**
 * ContentContainer 컴포넌트는 컨텐츠를 표시할 영역을 나타내고 사용자가 선택한 옵션에 따라 다른 컨텐츠를 렌더링합니다.
 * @param {object} props - 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 컨텐츠 영역안에 들어갈 컴포넌트
 * @param {'feed' | 'post' | 'scrap'} props.selectedOption - 'feed', 'post', 'scrap' 중 하나의 값을 가지는 상태
 * @param {(args: 'feed' | 'post' | 'scrap') => void} props.setSelectedOption - 상태를 제어하는 함수
 * @param {boolean} [props.isMyProfile=false] - 내 프로필인지 여부를 나타내는 플래그. true이면 스크랩 옵션까지 표시됩니다.
 * @returns {JSX.Element} ContentContainer 컴포넌트의 JSX 요소
 */

import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';

interface ContentContainerProps {
  children: React.ReactNode;
  selectedOption: 'feed' | 'post' | 'scrap';
  setSelectedOption: (args: 'feed' | 'post' | 'scrap') => void;
  isMyProfile?: boolean;
}

export default function ContentContainer({
  children,
  selectedOption,
  setSelectedOption,
  isMyProfile = false,
}: ContentContainerProps) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <div className={cn('post-type')}>
          <button
            type="button"
            onClick={() => setSelectedOption('feed')}
            className={cn('option', {
              'active-text': selectedOption === 'feed',
            })}
          >
            피드
          </button>
          <button
            type="button"
            onClick={() => setSelectedOption('post')}
            className={cn('option', {
              'active-text': selectedOption === 'post',
            })}
          >
            포스트
          </button>
          {isMyProfile && (
            <button
              type="button"
              onClick={() => setSelectedOption('scrap')}
              className={cn('option', {
                'active-text': selectedOption === 'scrap',
              })}
            >
              스크랩
            </button>
          )}
          <div className={cn('active', { [selectedOption]: selectedOption })} />
        </div>
        {/* 추후 dropdown 컴포넌트로 변경 예정 */}
        <div className={cn('dropdown')}>팔로우</div>
      </div>
      <div className={cn('divide-line')} />
      <div className={cn('content')}>{children}</div>
    </div>
  );
}
