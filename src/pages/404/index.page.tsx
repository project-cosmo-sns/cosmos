import React from 'react';
import { MainLogoIcon } from '@/components/Common/IconCollection';
import styles from './ErrorPage.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import Link from 'next/link';

const cn = classNames.bind(styles);

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function ErrorPage() {
  return (
    <div className={cn('error-container')}>
      <div className={cn('error-wrpper')}>
        <MainLogoIcon width="90" height="90" />
        <h1>404 ERROR</h1>
        <span>
          페이지를 찾을 수 없습니다.
          <br />
          올바른 URL을 입력하였는지 확인해 주세요.
        </span>
      </div>
      <div className={cn('button-wrapper')}>
        <Link href="/">
          <DefaultButton size="large" color="primary-01">
            메인으로 돌아가기
          </DefaultButton>
        </Link>
      </div>
    </div>
  );
}
