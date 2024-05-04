import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';
import SortDropdown from '../Buttons/SortDropdown';
import OptionButton from './OptionButton';
import { ContainerOptionType } from '@/@types/type';

const cn = classNames.bind(styles);

interface ContentContainerProps {
  children: React.ReactNode;
  keyword?: string;
  selectedOption: ContainerOptionType;
  setSelectedOption: (args: ContainerOptionType) => void;
  selectedSort?: 'all' | 'followed' | 'myGeneration';
  setSelectedSort?: (args: 'all' | 'followed' | 'myGeneration') => void;
  isMyProfile?: boolean;
}

/**
 * ContentContainer 컴포넌트는 컨텐츠를 표시할 영역을 나타내고 사용자가 선택한 옵션에 따라 다른 컨텐츠를 렌더링합니다.
 * @param {object} props - 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 컨텐츠 영역안에 들어갈 컴포넌트
 * @param {React.ReactNode} props.keyword - 검색 keyword 가 있으면 해시태그, 사용자 옵션을 가지는 검색 결과 컨테이너로, 없으면 포스트,피드를 가집니다.
 * @param {'feed'| 'post'| 'scrap'| 'hashtag'| 'user'} props.selectedOption - 'feed', 'post', 'scrap', 'hashtag', 'user'중 하나의 값을 가지는 상태
 * @param {(args: 'feed'| 'post'| 'scrap'| 'hashtag'| 'user') => void} props.setSelectedOption - selectedOption 상태를 제어하는 함수
 * @param {boolean} [props.isMyProfile=false] - 내 프로필인지 여부를 나타내는 플래그. true이면 스크랩 옵션까지 표시됩니다.
 * @returns {JSX.Element} ContentContainer 컴포넌트의 JSX 요소
 */

export default function ContentContainer({
  children,
  keyword,
  selectedOption,
  setSelectedOption,
  selectedSort,
  setSelectedSort,
  isMyProfile = false,
}: ContentContainerProps) {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <div className={cn('post-type')}>
          <OptionButton
            label={keyword ? '해시태그' : '피드'}
            onClick={() => setSelectedOption(keyword ? 'hashtag' : 'feed')}
            isActive={selectedOption === (keyword ? 'hashtag' : 'feed')}
          />
          <OptionButton
            label={keyword ? '사용자' : '포스트'}
            onClick={() => setSelectedOption(keyword ? 'user' : 'post')}
            isActive={selectedOption === (keyword ? 'user' : 'post')}
          />
          {isMyProfile && (
            <OptionButton
              label="스크랩"
              onClick={() => setSelectedOption('scrap')}
              isActive={selectedOption === 'scrap'}
            />
          )}
          <div className={cn('active', { [selectedOption]: selectedOption })} />
        </div>
        <div className={cn('filter-container')}>
          {keyword && (
            <span className={cn('keyword-text')}>{keyword} 검색 결과</span>
          )}
          {selectedSort && setSelectedSort && (
            <SortDropdown
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          )}
        </div>
      </div>
      <div className={cn('divide-line')} />
      <div className={cn('content', { 'profile-content': isMyProfile })}>
        {children}
      </div>
    </div>
  );
}
