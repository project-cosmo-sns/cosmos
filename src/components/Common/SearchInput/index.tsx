import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

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
      <Image src="/images/glass.svg" alt="검색 아이콘" width={18} height={18} />
    </div>
  );
}
