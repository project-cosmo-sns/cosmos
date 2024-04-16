import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const [search, setSearch] = useState('');

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className={cn('input-wrap')}>
      <input
        type="text"
        placeholder="검색"
        value={search}
        onChange={handleSearchTermChange}
      />
      <Image src="/icon/glass.svg" alt="검색 아이콘" width={14} height={14} />
    </div>
  );
}
