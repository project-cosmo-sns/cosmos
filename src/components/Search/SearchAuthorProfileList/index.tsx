import classNames from 'classnames/bind';
import styles from './SearchAuthorProfileList.module.scss';
import SearchAuthorProfile from '../SearchAuthorProfile';

const cn = classNames.bind(styles);

export default function SearchAuthorProfileList() {
  const mockData = [
    {
      id: '고유값1',
      nickname: '사용자1',
      profileImageUrl: '',
      generation: 3,
    },
    {
      id: '고유값2',
      nickname: '사용자2',
      profileImageUrl: '',
      generation: 3,
    },
    {
      id: '고유값3',
      nickname: '사용자3',
      profileImageUrl: '',
      generation: 3,
    },
    {
      id: '고유값4',
      nickname: '사용자4',
      profileImageUrl: '',
      generation: 1,
    },
    {
      id: '고유값5',
      nickname: '사용자5',
      profileImageUrl: '',
      generation: 2,
    },
    {
      id: '고유값6',
      nickname: '사용자6',
      profileImageUrl: '',
      generation: 1,
    },
  ];

  return (
    <div className={cn('wrapper')}>
      {mockData.map((author) => (
        <SearchAuthorProfile key={author.id} author={author} />
      ))}
    </div>
  );
}
