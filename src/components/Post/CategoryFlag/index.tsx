import classNames from 'classnames/bind';
import styles from './CategoryFlag.module.scss';

type CategoryType = '공지사항' | '이벤트' | '특강' | '정보공유' | '오늘의 질문';

interface CategoryFlag {
  category: CategoryType;
  selectedCategory: CategoryType;
  setSelectedCategory: (args: CategoryType) => void;
}

export default function CategoryFlag({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryFlag) {
  const cn = classNames.bind(styles);
  const isSelected = category === selectedCategory;

  return (
    <button
      type="button"
      className={cn('category', { selected: isSelected })}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </button>
  );
}
