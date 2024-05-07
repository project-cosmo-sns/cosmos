import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import githubLogin from '@/api/Oauth';
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
  const { mutate } = useMutation({
    mutationFn: githubLogin,
  });

  useEffect(() => {
    if (router.query.code) {
      mutate(router.query.code as string);
    }
  }, [router.query.code]);

  return <div>redirect 이동중~~</div>;
}
