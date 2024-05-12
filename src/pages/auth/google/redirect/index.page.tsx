import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { googleLogin } from '@/api/Oauth';
import { useMutation } from '@tanstack/react-query';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function GoogleRedirect() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: googleLogin,
  });
  useEffect(() => {
    if (router.query.code) {
      mutate(router.query.code as string);
    }
    console.log(router.query.code);
  }, [router.query.code]);
  return <div>Google Redirect</div>;
}
