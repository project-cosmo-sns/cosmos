import classNames from 'classnames/bind';
import styles from './CategoryFlag.module.scss';
import { CATEGORY_LIST } from '@/constants/categoryList';

interface CategoryFlagProps {
  category: string;
  selectedCategory: string;
  setSelectedCategory: (args: string) => void;
}

const cn = classNames.bind(styles);

export default function CategoryFlag({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryFlagProps) {
  const isSelected = category === selectedCategory;

  return (
    <button
      type="button"
      className={cn('category', { selected: isSelected })}
      onClick={() => setSelectedCategory(category)}
    >
      {category === 'ALL' ? '전체' : CATEGORY_LIST[category]}
    </button>
  );
}
