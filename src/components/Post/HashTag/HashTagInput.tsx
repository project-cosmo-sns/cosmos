import fetchData from '@/api/fetchData';
import { WarnIcon } from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import { Tag } from '@/pages/post/[postId]/mockData';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import HashTag from '.';
import styles from './HashTagInput.module.scss';
import { HashTagType } from '../types';
import HashTagRecommend from './HashTagRecommend';

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
  const [isToastVisible, setIsToastVisible] = useState(false);

  const { data, isPending, isSuccess, isError } = useQuery<HashTagType[]>({
    queryKey: ['hashtag', tagValue],
    queryFn: () =>
      fetchData({
        param: `/post/search/hashTag?searchWord=${tagValue}`,
      }),
    enabled: !!tagValue,
  });

  const handleAddHashtag = ({
    event,
    name,
    color,
  }: {
    event?: React.KeyboardEvent<HTMLInputElement>;
    name?: string;
    color?: string;
  }) => {
    event?.preventDefault();
    const trimmedTagValue = tagValue.trim();
    const regex = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;

    if (trimmedTagValue !== '') {
      if (hashtags.length > 4) {
        setIsToastVisible(true);
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
      // 해시태그 컬러없으면 난수로 설정
      const randomNumber = Math.floor(Math.random() * 5 + 1);
      setHashtags([
        ...hashtags,
        {
          name: name || `${trimmedTagValue}`,
          color: color ? `hashtag${color}` : `hashtag${randomNumber}`,
        },
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
      handleAddHashtag({ event });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isToastVisible) setIsToastVisible(false);
    }, 3000);
  });

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
      {isSuccess && (
        <HashTagRecommend
          hashTagList={data}
          setTagValue={setTagValue}
          handleAddHashtag={handleAddHashtag}
        />
      )}
      <div className={cn('toast-container')}>
        <Toast
          isVisible={isToastVisible}
          icon={WarnIcon}
          text="최대 5개의 해시태그만 추가할 수 있습니다."
        />
      </div>
    </div>
  );
}
