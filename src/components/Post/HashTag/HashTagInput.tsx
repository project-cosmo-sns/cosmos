import fetchData from '@/api/fetchData';
import { Tag } from '@/pages/post/[postId]/mockData';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import HashTag from '.';
import styles from './HashTagInput.module.scss';

interface HashTagInputProps {
  hashtags: Tag[];
  setHashtags: (args: Tag[]) => void;
}

const cn = classNames.bind(styles);

export default function HashTagInput({
  hashtags,
  setHashtags,
}: HashTagInputProps) {
  const [tagValue, setTagValue] = useState<string>('');
  const [recommendValue, setRecommendValue] = useState<string[] | undefined>();

  const { data, isPending, isSuccess, isError } = useQuery<{
    tagName: string[];
  }>({
    queryKey: ['hashtag', tagValue],
    queryFn: () =>
      fetchData({
        param: `/post/search/hashTag?searchWord=${tagValue}`,
      }),
    enabled: !!tagValue,
  });

  const handleAddHashtag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const trimmedTagValue = tagValue.trim();
    const regex = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;

    if (trimmedTagValue !== '') {
      // 해시태그 길이 제한 - alert는 추후 토스트로 변경하면 좋을 것 같음
      if (hashtags.length > 4) {
        alert('최대 5개의 해시태그만 추가할 수 있습니다.');
        setTagValue('');
        return;
      }
      // 해시태그 중복값 및 한글, 영어, 숫자 외 값 입력 시 hashtag 배열에 추가하지 않고 입력값 초기화
      if (
        hashtags.some((tag) => tag.name === `${trimmedTagValue}`) ||
        regex.test(trimmedTagValue)
      ) {
        setTagValue('');
        return;
      }
      // 해시태그 컬러 난수로 설정
      const randomNumber = Math.floor(Math.random() * 5 + 1);
      setHashtags([
        ...hashtags,
        { name: `${trimmedTagValue}`, color: `hashtag${randomNumber}` },
      ]);
      setTagValue('');
    }
  };

  // X 버튼으로 선택한 해시태그를 지우는 함수
  const handleDeleteHashtag = (tagName: string) => {
    const updatedHashtags = hashtags.filter((tag) => tag.name !== tagName);
    setHashtags(updatedHashtags);
  };

  const handleSearchHashtag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(event.target.value);
    if (isSuccess) {
      const { tagName } = data;
      if (tagName) {
        setRecommendValue(tagName);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !tagValue.length) {
      const updatedHashtags = [...hashtags];
      updatedHashtags.pop();
      setHashtags(updatedHashtags);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleAddHashtag(event);
    }
  };

  console.log(recommendValue);

  return (
    <div className={cn('wrapper')}>
      {hashtags.map((tag, index) => (
        <HashTag
          key={`${tag}${index}`}
          tag={tag}
          handleClick={() => handleDeleteHashtag(tag.name)}
        />
      ))}
      <input
        className={cn('hashtag-input')}
        placeholder={hashtags.length ? '' : '태그 입력 (최대 5개)'}
        onChange={handleSearchHashtag}
        value={tagValue}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      {recommendValue?.length && <div>{recommendValue}</div>}
    </div>
  );
}
