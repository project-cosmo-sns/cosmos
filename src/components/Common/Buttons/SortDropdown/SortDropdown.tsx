import classNames from 'classnames/bind';
import styles from './SortDropdown.module.scss';
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function SortDropdown() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortType, setSortType] = useState('전체');
  const sortTypeList = ['전체', '팔로우', '내 기수'];

  const SortExpandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const SortTypeHandler = (type: string) => {
    setSortType(type);
    setIsExpanded(false);
  };

  return (
    <div>
      {
        <button
          onClick={SortExpandHandler}
          className={cn('dropdown-expand-button')}
        >
          {sortType}
          {isExpanded ? '^' : '⌄'}
        </button>
      }
      {isExpanded && (
        <div
          onClick={SortExpandHandler}
          className={cn('expanded-dropdown-container')}
        >
          {sortTypeList.map((type, idx) => (
            <button
              key={type}
              onClick={() => SortTypeHandler(type)}
              className={cn('expanded-dropdown-list', {
                'first-item': idx === 0,
                'last-item': idx === sortTypeList.length - 1,
              })}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
