import React, { useEffect } from 'react';
import { githubLogin } from '@/api/Oauth';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function GithubRedirect() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      githubLogin(code);
    }
  }, []);

  return <div>redirect 이동중~~</div>;
}
