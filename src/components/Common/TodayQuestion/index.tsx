import styles from './TodayQuestion.module.scss';
import classNames from 'classnames/bind';
import { RightIcon } from '../IconCollection';
import { useQuery } from '@tanstack/react-query';
import { TodayQuestionResult } from './type';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

export default function TodayQuestion() {
  const router = useRouter();

  const { data } = useQuery<TodayQuestionResult>({
    queryKey: ['todayQuestion'],
    queryFn: () =>
      fetchData({
        param: `/post/today-question`,
      }),
  });

  return (
    <div
      className={cn('question-container')}
      onClick={() => router.push(`/post/${data?.postId}`)}
    >
      <div className={cn('question-title')}>
        <strong>오늘의 질문</strong>
        <RightIcon fill="#fff" className={cn('viewmore-icon')} />
      </div>
      <h3 className={cn('question-text')}>{data?.title}</h3>
    </div>
  );
}
