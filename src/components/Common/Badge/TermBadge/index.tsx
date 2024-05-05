import styles from './TermBadge.module.scss';
import classNames from 'classnames/bind';

interface TermBadgeTypes {
  term: number;
}

const cn = classNames.bind(styles);

export default function TermBadge({ term }: TermBadgeTypes) {
  return (
    <div className={cn('term-badge')}>
      {term ? <span>{term}기</span> : <span>미등록</span>}
    </div>
  );
}
