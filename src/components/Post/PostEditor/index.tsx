import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryFlag from '../CategoryFlag';
import styles from './PostEditor.module.scss';

type CategoryType = '공지사항' | '이벤트' | '특강' | '정보공유' | '오늘의 질문';

export default function PostEditor() {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('공지사항');

  // 임시로 배열로 추가. 추후 카테고리 키 값 정해지면 객체로 수정 예정
  const CATEGORY_LIST: CategoryType[] = [
    '공지사항',
    '이벤트',
    '특강',
    '정보공유',
    '오늘의 질문',
  ];

  return (
    <div className={cn('wrapper')}>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>카테고리 선택</span>
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
      </div>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>글 작성</span>
        <input
          className={cn('title', 'input')}
          placeholder="제목을 입력하세요"
        />
        <textarea className={cn('editor')} placeholder="글을 작성해보세요" />
      </div>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>해시태그 입력</span>
        <input
          className={cn('input', 'hashtag')}
          placeholder="#태그 입력 (최대 5개)"
        />
      </div>
    </div>
  );
}
