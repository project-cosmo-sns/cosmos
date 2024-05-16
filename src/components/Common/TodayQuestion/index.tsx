import fetchData from '@/api/fetchData';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { RightIcon } from '../IconCollection';
import styles from './TodayQuestion.module.scss';
import { TodayQuestionResult } from './type';

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

  const { checkMemberStatus } = useFetchMemberStatus();

  return (
    <div
      className={cn('question-container')}
      onClick={() =>
        checkMemberStatus(() => router.push(`/post/${data?.postId}`))
      }
    >
      <div className={cn('question-title')}>
        <strong>오늘의 질문</strong>
        <RightIcon fill="#fff" className={cn('viewmore-icon')} />
      </div>
      <h3 className={cn('question-text')}>{data?.title}</h3>
    </div>
  );
}
