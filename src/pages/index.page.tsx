import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import TodayQuestion from '@/components/Common/TodayQuestion';
import FeedCardList from '@/components/Feed/FeedCardList';
import PostList from '@/components/Post/PostList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Toast from '@/components/Common/Toast';
import { CheckIcon } from '@/components/Common/IconCollection';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Home() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('generation')) {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        localStorage.removeItem('generation');
      }, 5000);
    }
  }, []);

  return (
    <div className={cn('home-container')}>
      <TodayQuestion />
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      >
        {selectedOption === 'feed' ? (
          <FeedCardList />
        ) : (
          <PostList selectedSort={selectedSort} />
        )}
      </ContentContainer>
      {toastVisible && (
        <Toast
          text="인증 신청이 완료되었습니다"
          icon={CheckIcon}
          fill="#0ACF83"
        />
      )}
    </div>
  );
}