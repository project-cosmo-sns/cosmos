import fetchData from '@/api/fetchData';
import { HashTagType } from '@/components/Post/types';
import { HASH_TAG_COLORS, HASH_TAG_COLOR_CODE } from '@/constants/hashTagCode';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import HashTag from '.';
import styles from './HashTagInput.module.scss';
import HashTagRecommend from './HashTagRecommend';

interface HashTagInputProps {
  hashtags: HashTagType[];
  setHashtags: (args: HashTagType[]) => void;
}

const cn = classNames.bind(styles);

export default function HashTagInput({
  hashtags,
  setHashtags,
}: HashTagInputProps) {
  const [tagValue, setTagValue] = useState<string>('');

  const { data, isSuccess } = useQuery<HashTagType[]>({
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
    colorCode,
  }: {
    event?: React.KeyboardEvent<HTMLInputElement>;
    name?: string;
    colorCode?: HASH_TAG_COLOR_CODE;
  }) => {
    event?.preventDefault();

    const trimmedTagValue = tagValue.trim();
    const regex = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;

    if (trimmedTagValue !== '') {
      if (hashtags.length > 4) {
        setTagValue('');
        return;
      }
      // 해시태그 중복값 및 한글, 영어, 숫자 외 값 입력 시 hashtag 배열에 추가하지 않고 입력값 초기화
      if (
        hashtags.some((tag) => tag.tagName === `${trimmedTagValue}`) ||
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
          tagName: name || `${trimmedTagValue}`,
          color: colorCode || HASH_TAG_COLORS[randomNumber].code,
        },
      ]);
      setTagValue('');
    }
  };

  // X 버튼 클릭 시 선택한 해시태그를 지우는 함수
  const handleDeleteHashtag = (name: string) => {
    const updatedHashtags = hashtags.filter((tag) => tag.tagName !== name);
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
      if (isSuccess && data) {
        const foundTag = data.find((tag) => tag.tagName === tagValue);
        if (foundTag) {
          handleAddHashtag({
            name: foundTag.tagName,
            colorCode: foundTag.color,
          });
        } else {
          handleAddHashtag({ event });
        }
      } else {
        handleAddHashtag({ event });
      }
    }
  };

  return (
    <div className={cn('wrapper')}>
      {hashtags.map((tag, index) => (
        <HashTag
          key={`${index}${tag.tagName}`}
          tag={tag}
          handleClick={() => handleDeleteHashtag(tag.tagName)}
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
          className={cn('hashtag-recommend')}
          hashTagList={data}
          setTagValue={setTagValue}
          handleAddHashtag={handleAddHashtag}
        />
      )}
    </div>
  );
}
