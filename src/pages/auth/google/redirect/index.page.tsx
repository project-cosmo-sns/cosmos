import React, { useEffect } from 'react';
import { googleLogin } from '@/api/Oauth';
import { MainLogoIcon, LogoIcon } from '@/components/Common/IconCollection';
import styles from './GoogleRedirect.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function GoogleRedirect() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      googleLogin(code);
    }
  }, []);

  return (
    <div className={cn('googleRedirect-container')}>
      <MainLogoIcon width='50' height='50'/>
      <LogoIcon width="150" height="150" />
    </div>
  );
}
