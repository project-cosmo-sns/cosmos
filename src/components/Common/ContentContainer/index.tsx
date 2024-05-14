import { ContainerOptionType } from '@/@types/type';
import useScrollDirection from '@/hooks/useScrollDirection';
import classNames from 'classnames/bind';
import SortDropdown from '../Buttons/SortDropdown';
import styles from './ContentContainer.module.scss';
import OptionButton from './OptionButton';
import scrollToTop from '@/utils/scrollToTop';
import ModalPortal from '../Layout/Modal/ModalPortal';
import { ScrollTopIcon } from '../IconCollection';
import { SortType } from '@/constants/sortType';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

export interface ContentContainerProps {
  children: React.ReactNode;
  keyword?: string | null;
  selectedOption: ContainerOptionType;
  setSelectedOption: (args: ContainerOptionType) => void;
  selectedSort?: SortType;
  setSelectedSort?: (args: SortType) => void;
  isMyProfile?: boolean;
}

/**
 * ContentContainer 컴포넌트는 컨텐츠를 표시할 영역을 나타내고 사용자가 선택한 옵션에 따라 다른 컨텐츠를 렌더링합니다.
 * @param {object} props - 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 컨텐츠 영역안에 들어갈 컴포넌트
 * @param {React.ReactNode} props.keyword - 검색 keyword 가 있으면 해시태그, 사용자 옵션을 가지는 검색 결과 컨테이너로, 없으면 포스트,피드를 가집니다.
 * @param {'feed'| 'post'| 'scrap'| 'hashtag'| 'user'} props.selectedOption - 'feed', 'post', 'scrap', 'hashtag', 'user'중 하나의 값을 가지는 상태
 * @param {SortType} props.selectedSort - 선택된 정렬 상태
 * @param {(args: SortType)=> void} props.setSelectedSort - 정렬 상태를 제어하는 함수
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
  const router = useRouter();
  const [scrollDirection] = useScrollDirection('up');

  const handleOptionClick = (option: string) => {
    scrollToTop();
    setSelectedOption(option as ContainerOptionType);

    router.push({
      pathname: `${router.pathname}`,
      query: { ...router.query, tab: option },
    });
  };

  const renderOptionButton = (label: string, option: string) => (
    <OptionButton
      label={label}
      onClick={() => handleOptionClick(option)}
      isActive={selectedOption === option}
    />
  );

  useEffect(() => {
    setSelectedOption(
      router.query.tab ? (router.query.tab as ContainerOptionType) : 'feed',
    );
  }, [router.query.tab]);

  return (
    <>
      <div className={cn('wrapper')}>
        <div
          className={cn('header-container', {
            up: scrollDirection === 'up',
            down: scrollDirection === 'down',
          })}
        >
          <div className={cn('header')}>
            <div className={cn('post-type')}>
              {renderOptionButton(
                keyword ? '해시태그' : '피드',
                keyword ? 'hashtag' : 'feed',
              )}
              {renderOptionButton(
                keyword ? '사용자' : '포스트',
                keyword ? 'user' : 'post',
              )}
              {isMyProfile && renderOptionButton('스크랩', 'scrap')}
              <div
                className={cn('active', { [selectedOption]: selectedOption })}
              />
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
        </div>
        <div className={cn('content', { 'profile-content': isMyProfile })}>
          {children}
        </div>
      </div>
      <ModalPortal modalVisible>
        <div className={cn('scroll-top')} onClick={scrollToTop}>
          <ScrollTopIcon />
        </div>
      </ModalPortal>
    </>
  );
}
