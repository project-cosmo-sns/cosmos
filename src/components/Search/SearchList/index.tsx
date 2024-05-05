import SearchPreview from '../SearchPriview';
import { SearchData } from '../type';
import styles from './SearchList.module.scss';
import classNames from 'classnames/bind';

interface SearchListProps {
  searchList: SearchData[];
}

const cn = classNames.bind(styles);

export default function SearchList({ searchList }: SearchListProps) {
  return (
    <div className={cn('search-list')}>
      {searchList.map((searchData) => (
        <SearchPreview key={searchData.post.id} searchData={searchData} />
      ))}
    </div>
  );
}
