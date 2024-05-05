import classNames from 'classnames/bind';
import styles from './NoSearchResult.module.scss';

const cn = classNames.bind(styles);

export default function NoSearchResult() {
  return <p className={cn('search-noresult')}>검색 결과가 없습니다.</p>;
}
