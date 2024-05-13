import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, useEffect, useState } from 'react';
import CategoryList from '../CategoryList';
import HashTagInput from '../HashTag/HashTagInput';
import MarkdownEditor from '../MarkdownEditor';
import { PostDetailType, PostRequestType } from '../types';
import styles from './PostEditor.module.scss';
import { CATEGORY_LIST } from '@/constants/categoryList';
import getKeyByValue from '@/utils/getKeyByValue';
import { useToast } from '@/hooks/useToast';

interface PostEditorProps {
  postId: string;
  postData: PostRequestType;
  mergeState: (args: Partial<PostRequestType>) => void;
}

const cn = classNames.bind(styles);

export default function PostEditor({
  postId,
  postData,
  mergeState,
}: PostEditorProps) {
  const { showToastHandler } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('NOTICE');

  const { data, isSuccess } = useQuery<PostDetailType>({
    queryKey: ['postData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/detail`,
      }),
    enabled: !!postId,
  });

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 50) {
      showToastHandler('50자 이상 작성할 수 없습니다.', 'warn');
      return '';
    }
    mergeState({ title: event.target.value });
    return '';
  };

  useEffect(() => {
    if (postId && isSuccess) {
      const { post } = data.postDetail;
      const { title, content, category, hashTags } = post;
      setSelectedCategory(getKeyByValue(CATEGORY_LIST, category)!);

      mergeState({
        title,
        content,
        category,
        hashTags,
      });
    }
  }, [postId, isSuccess]);

  useEffect(() => {
    mergeState({ category: CATEGORY_LIST[selectedCategory] });
  }, [selectedCategory]);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>카테고리 선택</span>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isPostWrite
        />
      </div>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>글 작성</span>
        <input
          className={cn('title', 'input')}
          value={postData.title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
        />
        <MarkdownEditor
          content={postData.content}
          setContent={(args) => mergeState({ content: args })}
        />
      </div>
      <div className={cn('container')}>
        <span className={cn('subtitle')}>해시태그 입력</span>
        <HashTagInput
          hashtags={postData.hashTags}
          setHashtags={(args) => mergeState({ hashTags: args })}
        />
      </div>
    </div>
  );
}
