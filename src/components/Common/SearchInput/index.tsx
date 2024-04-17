import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import { ChangeEvent, useState } from 'react';
import { GlassIcon } from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const [search, setSearch] = useState('');

  const handleSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };
  return (
    <div className={cn('search-container')}>
      <input
        type="text"
        placeholder="검색"
        value={search}
        onChange={handleSearchChange}
      />
      <GlassIcon className={cn('search-icon')} />
    </div>
  );
}
