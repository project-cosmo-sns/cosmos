import { useDispatch, useSelector } from 'react-redux';
import { updateKeyword } from '@/redux/searchSlice';
import { RootState } from '@/redux/store';
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { GlassIcon, CloseIcon } from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import useDebounce from '@/hooks/useDebounce';

const cn = classNames.bind(styles);

export default function SearchInput() {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedValue = useDebounce(inputValue, 300);

  const search = useSelector((state: RootState) => state.search.keyword);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(updateKeyword(debouncedValue));
  }, [debouncedValue, dispatch]);

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(inputValue)}`);
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
    setInputValue('');
    dispatch(updateKeyword(''));
    router.push('/');
  };

  return (
    <div className={cn('search-container')}>
      <input
        type="text"
        placeholder="검색"
        value={inputValue}
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
