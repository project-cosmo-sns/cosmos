import { useDispatch, useSelector } from 'react-redux';
import { updateKeyword, clearKeyword } from '@/redux/searchSlice';
import { RootState } from '@/redux/store';
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { GlassIcon, CloseIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const search = useSelector((state: RootState) => state.search.keyword);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateKeyword(e.target.value));
  };

  const handleSearch = () => {
    if (search.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    } else {
      router.push('/');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClear = () => {
    dispatch(clearKeyword());
    router.push('/');
  };

  const handleToOtherPage = () => {
    dispatch(clearKeyword());
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleToOtherPage);
    return () => {
      router.events.off('routeChangeStart', handleToOtherPage);
    };
  }, [router.events]);

  return (
    <div className={cn('search-container')}>
      <input
        type="text"
        placeholder="검색"
        value={search}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {search && (
        <CloseIcon
          className={cn('clear-icon')}
          onClick={handleSearchClear}
          fill="#ccc"
        />
      )}
      <GlassIcon
        className={cn('search-icon')}
        onClick={handleSearch}
        fill="#fff"
      />
    </div>
  );
}
