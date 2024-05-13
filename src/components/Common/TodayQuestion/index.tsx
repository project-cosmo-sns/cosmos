import styles from './TodayQuestion.module.scss';
import classNames from 'classnames/bind';
import { RightIcon } from '../IconCollection';
import { useQuery } from '@tanstack/react-query';
import { TodayQuestionResult } from './type';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';
import Unauthorized from './Unauthorized';

const cn = classNames.bind(styles);

export default function TodayQuestion() {
  const router = useRouter();

  const { data, isError } = useQuery<TodayQuestionResult>({
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
      {isError ? (
        <Unauthorized />
      ) : (
        <>
          <div className={cn('question-title')}>
            <strong>오늘의 질문</strong>
            <RightIcon fill="#fff" className={cn('viewmore-icon')} />
          </div>
          <h3 className={cn('question-text')}>{data?.title}</h3>
        </>
      )}
    </div>
  );
}
