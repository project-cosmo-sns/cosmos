import classNames from 'classnames/bind';
import styles from './SortDropdown.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import SortDropdownType from './SortDropdownType';

/**
 * @param {function} onSortAll : 전체 버튼 클릭 시 동작할 로직
 * @param {function} onSortFollow : 팔로우 클릭 시 동작할 로직
 * @param {function} onSortMyGen : 내 기수 버튼 클릭 시 동작할 로직
 * @returns button
 */

const cn = classNames.bind(styles);

export default function SortDropdown({
  onSortFollow,
  onSortAll,
  onSortMyGen,
}: SortDropdownType) {
  const SORT_TYPES = {
    ALL: '전체',
    FOLLOW: '팔로우',
    MY_GEN: '내 기수',
  };

  const sortTypeList = [SORT_TYPES.ALL, SORT_TYPES.FOLLOW, SORT_TYPES.MY_GEN];
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortType, setSortType] = useState(SORT_TYPES.ALL);

  const sortExpandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const sortTypeHandler = (type: string) => {
    setSortType(type);
    setIsExpanded(false);
    if (type === SORT_TYPES.ALL) {
      onSortAll();
    } else if (type === SORT_TYPES.FOLLOW) {
      onSortFollow();
    } else if (type === SORT_TYPES.MY_GEN) {
      onSortMyGen();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={sortExpandHandler}
        className={cn('dropdown-expand-button')}
      >
        {sortType}
        <div className={cn('icon-container')}>
          {isExpanded ? (
            <Image
              src="/icon/up.svg"
              width={18}
              height={18}
              alt="접는 아이콘"
            />
          ) : (
            <Image
              src="/icon/down.svg"
              width={18}
              height={18}
              alt="펼치는 아이콘"
            />
          )}
        </div>
      </button>

      {isExpanded && (
        <div
          onClick={sortExpandHandler}
          className={cn('expanded-dropdown-container')}
          role="button"
          tabIndex={0}
        >
          {sortTypeList.map((type, idx) => (
            <button
              key={type}
              onClick={() => sortTypeHandler(type)}
              className={cn('expanded-dropdown-list', {
                'first-item': idx === 0,
                'last-item': idx === sortTypeList.length - 1,
              })}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
