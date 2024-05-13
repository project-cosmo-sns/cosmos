import { useDispatch } from 'react-redux';
import { updateKeyword, clearKeyword } from '@/redux/searchSlice';
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { GlassIcon, CloseIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword: string = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState<string>(keyword);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      dispatch(updateKeyword(inputValue));
      router.push(
        `/search?tab=hashtag&query=${encodeURIComponent(inputValue)}`,
      );
    } else {
      router.push('/?tab=feed');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClear = () => {
    setInputValue('');
  };

  const handleToOtherPage = () => {
    dispatch(clearKeyword());
  };

  useEffect(() => {
    if (router.pathname === '/search') {
      setInputValue(keyword);
      return () => {};
    }

    setInputValue('');
    router.events.on('routeChangeStart', handleToOtherPage);
    return () => {
      router.events.off('routeChangeStart', handleToOtherPage);
    };
  }, [router]);

  return (
    <div className={cn('search-container')}>
      <input
        type="text"
        placeholder="검색"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {inputValue && (
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
