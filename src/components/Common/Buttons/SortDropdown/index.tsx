import classNames from 'classnames/bind';
import { useState } from 'react';
import { DownIcon, UpIcon } from '../../IconCollection';
import styles from './SortDropdown.module.scss';

const cn = classNames.bind(styles);

interface SortDropdownType {
  selectedSort: 'all' | 'followed' | 'myGeneration';
  setSelectedSort: (args: 'all' | 'followed' | 'myGeneration') => void;
}

/**
 * @param {Function} onSortAll : 전체 버튼 클릭 시 동작할 로직
 * @param {Function} onSortFollow : 팔로우 클릭 시 동작할 로직
 * @param {Function} onSortMyGen : 내 기수 버튼 클릭 시 동작할 로직
 * @returns button
 */

export default function SortDropdown({
  selectedSort,
  setSelectedSort,
}: SortDropdownType) {
  const SORT_TYPES = {
    all: '전체',
    followed: '팔로우',
    myGeneration: '내 기수',
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const sortExpandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const sortTypeHandler = (type: 'all' | 'followed' | 'myGeneration') => {
    setSelectedSort(type);
    setIsExpanded(false);
  };

  return (
    <div className={cn('wrapper')}>
      <button
        type="button"
        onClick={sortExpandHandler}
        className={cn('dropdown-expand-button')}
      >
        {SORT_TYPES[selectedSort]}
        <div className={cn('icon-container')}>
          {isExpanded ? (
            <UpIcon
              className={cn('dropdown-arrow')}
              width="18"
              height="18"
              fill="#ffffff"
            />
          ) : (
            <DownIcon
              className={cn('dropdown-arrow')}
              width="18"
              height="18"
              fill="#ffffff"
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
          {Object.entries(SORT_TYPES).map(([type, label], idx) => (
            <button
              key={type}
              onClick={() =>
                sortTypeHandler(type as 'all' | 'followed' | 'myGeneration')
              }
              className={cn('expanded-dropdown-list', {
                'first-item': idx === 0,
                'last-item': idx === Object.keys(SORT_TYPES).length - 1,
              })}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
