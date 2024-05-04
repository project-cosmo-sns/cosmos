import classNames from 'classnames/bind';
import CategoryFlag from '../CategoryFlag';
import styles from './CategoryList.module.scss';
import { CATEGORY_LIST } from '@/constants/categoryList';

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (args: string) => void;
}

const cn = classNames.bind(styles);

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) {
  return (
    <div className={cn('category-box')}>
      <CategoryFlag
        category="전체"
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
