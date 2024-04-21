import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { GlassIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      console.log('검색 엔터', search);
      router.push(`/search?query=${encodeURIComponent(search)}`);
    } else if (e.key === 'Enter') {
      console.log('검색어 비어있음');
    }
  };

  return (
    <div className={cn('search-container')}>
      <input
        type="text"
        placeholder="검색"
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      <GlassIcon className={cn('search-icon')} />
    </div>
  );
}
