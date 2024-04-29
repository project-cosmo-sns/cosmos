import {
  CategoryType,
  PostData,
  Tag,
  mockData,
} from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CategoryList from '../CategoryList';
import HashTagInput from '../HashTag/HashTagInput';
import styles from './PostEditor.module.scss';
import MarkdownEditor from '../MarkdownEditor';

interface PostEditorProps {
  postId: string;
  setData: (args: PostData) => void;
}

const cn = classNames.bind(styles);

export default function PostEditor({ postId, setData }: PostEditorProps) {
  // 임시로 기본값 postId와 같은 포스트 mockData에서 불러옴. 추후 요청해서 받아오도록 수정
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [hashtags, setHashtags] = useState<Tag[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('공지사항');

  useEffect(() => {
    if (postId) {
      const postData = mockData.filter((data) => data.id === postId)[0];
      setSelectedCategory(postData.category);
      setTitleValue(postData.title);
      setContentValue(postData.content);
      setHashtags(postData.tags);
    }
  }, [postId]);

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
          value={titleValue}
          onChange={(event) => setTitleValue(event.target.value)}
          placeholder="제목을 입력하세요"
        />
        <MarkdownEditor />
        <textarea
          className={cn('editor')}
          value={contentValue}
          onChange={(event) => setContentValue(event.target.value)}
          placeholder="글을 작성해보세요"
        />
      </div>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>해시태그 입력</span>
        <HashTagInput hashtags={hashtags} setHashtags={setHashtags} />
      </div>
    </div>
  );
}
