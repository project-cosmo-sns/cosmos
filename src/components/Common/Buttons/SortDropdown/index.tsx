import classNames from 'classnames/bind';
import { useState } from 'react';
import { DownIcon, UpIcon } from '../../IconCollection';
import styles from './SortDropdown.module.scss';
import SortDropdownType from './SortDropdownType';

const cn = classNames.bind(styles);

/**
 * @param {Function} onSortAll : 전체 버튼 클릭 시 동작할 로직
 * @param {Function} onSortFollow : 팔로우 클릭 시 동작할 로직
 * @param {Function} onSortMyGen : 내 기수 버튼 클릭 시 동작할 로직
 * @returns button
 */

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
    <div className={cn('wrapper')}>
      <button
        type="button"
        onClick={sortExpandHandler}
        className={cn('dropdown-expand-button')}
      >
        {sortType}
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
