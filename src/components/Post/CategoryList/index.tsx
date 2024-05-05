import { CATEGORY_LIST } from '@/constants/categoryList';
import classNames from 'classnames/bind';
import CategoryFlag from '../CategoryFlag';
import styles from './CategoryList.module.scss';

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (args: string) => void;
  isPostWrite?: boolean;
}

const cn = classNames.bind(styles);

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  isPostWrite = false,
}: CategoryListProps) {
  return (
    <div className={cn('category-box')}>
      {!isPostWrite && (
        <CategoryFlag
          category="전체"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {CATEGORY_LIST.map((category) => (
        <CategoryFlag
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}
