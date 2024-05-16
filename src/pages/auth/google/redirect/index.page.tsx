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
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      googleLogin(code);
    }
  }, []);
  return <div>Google Redirect</div>;
}
