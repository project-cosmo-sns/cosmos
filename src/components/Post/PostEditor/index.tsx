import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CategoryList from '../CategoryList';
import HashTagInput from '../HashTag/HashTagInput';
import MarkdownEditor from '../MarkdownEditor';
import { PostDetailType, PostRequestType } from '../types';
import styles from './PostEditor.module.scss';

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
  const [selectedCategory, setSelectedCategory] = useState('공지사항');

  const { data, isSuccess } = useQuery<PostDetailType>({
    queryKey: ['postData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/detail`,
      }),
    enabled: !!postId,
  });

  useEffect(() => {
    if (postId && isSuccess) {
      const { post } = data.postDetail;
      const { title, content, category, hashTags } = post;
      setSelectedCategory(post.category);
      mergeState({ title, content, category, hashTags });
    }
  }, [postId, isSuccess]);

  useEffect(() => {
    mergeState({ category: selectedCategory });
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
          onChange={(event) => mergeState({ title: event.target.value })}
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
