import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import githubLogin from '@/api/useGithubLogin';
import { set } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      githubLogin(router.query.code as string);
    }
  }, [router.query.code]);

  return <div>redirect 이동중</div>;
}
