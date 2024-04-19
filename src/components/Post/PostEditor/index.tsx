import { CategoryType } from '@/@types/type';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryList from '../CategoryList';
import styles from './PostEditor.module.scss';

export default function PostEditor() {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('공지사항');

  return (
    <div className={cn('wrapper')}>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>카테고리 선택</span>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
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
