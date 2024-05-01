import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import githubLogin from '@/api/useGithubLogin';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      githubLogin(router.query.code as string);
    }
  }, [router.query.code]);

  return <div>Redirect</div>;
}
