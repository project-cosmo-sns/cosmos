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
  // useEffect(() => {
  //   const handleLogin = async () => {
  //     const code = new URLSearchParams(window.location.search).get('code');
  //     if (code) {
  //       try {
  //         await githubLogin(code);
  //         if (window.opener) {
  //           window.opener.postMessage('close', '*');
  //           console.log(code)
  //         }
  //         // window.close();
  //       } catch (error) {
  //         console.error('로그인 중 오류 발생:', error);
  //       }
  //     }
  //   };

  //   handleLogin();
  // }, []);
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      githubLogin(code);
    }
  }, []);

  return <div>redirect 이동중~~</div>;
}
