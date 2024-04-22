import { CategoryType } from '@/pages/post/[postId]/mockData';
import CategoryFlag from '../CategoryFlag';
import classNames from 'classnames/bind';
import styles from './CategoryList.module.scss';

interface CategoryListProps {
  selectedCategory: CategoryType;
  setSelectedCategory: (args: CategoryType) => void;
}

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) {
  const cn = classNames.bind(styles);
  // 임시로 배열로 추가. 추후 카테고리 키 값 정해지면 객체로 수정 예정
  const CATEGORY_LIST: CategoryType[] = [
    '공지사항',
    '이벤트',
    '특강',
    '정보공유',
    '오늘의 질문',
  ];
  return (
    <div className={cn('category-box')}>
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
