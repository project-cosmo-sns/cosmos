import classNames from 'classnames/bind';
import { useState } from 'react';
import { DownIcon, UpIcon } from '../../IconCollection';
import styles from './SortDropdown.module.scss';
import { SORT_OPTION, SortType } from '@/constants/sortType';

const cn = classNames.bind(styles);

interface SortDropdownType {
  selectedSort: SortType;
  setSelectedSort: (args: SortType) => void;
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
  const [isExpanded, setIsExpanded] = useState(false);

  const sortExpandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const sortTypeHandler = (type: SortType) => {
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
        {SORT_OPTION[selectedSort]}
        <div className={cn('icon-container')}>
          {isExpanded ? (
            <UpIcon className={cn('dropdown-arrow')} width="18" height="18" />
          ) : (
            <DownIcon className={cn('dropdown-arrow')} width="18" height="18" />
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
          {Object.entries(SORT_OPTION).map(([type, label], idx) => (
            <button
              key={type}
              onClick={() => sortTypeHandler(type as SortType)}
              className={cn('expanded-dropdown-list', {
                'first-item': idx === 0,
                'last-item': idx === Object.keys(SORT_OPTION).length - 1,
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
