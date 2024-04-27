import React, { useEffect } from 'react';
import { customAxios } from '@/api/axios';
import { useRouter } from 'next/router';
import axios from 'axios';

const instances = axios.create({
  baseURL: 'https://api-local.cosmo-sns.com',
  withCredentials: true,
});

export default function Redirect() {
  const router = useRouter();
  const fetchGitHub = async (code: string) => {
    try {
      const res = await instances.post(`/auth/github/redirect?code=${code}`);
      console.log(res);
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  useEffect(() => {
    if (router.query.code) {
      fetchGitHub(router.query.code as string);
    }
  }, [router]);

  console.log(router.query.code);

  return <div>Redirect</div>;
}

/**
 * https://api-local.cosmo-sns.com/auth/github/redirect?code=${code}
 * https://localhost:3000/auth/github/redirect?code=${code}
 * 세션은 쿠키와 달리 데이터를 서버에 저장하고 클라이언트에는 세션ID만 전달.
 * 이 때 저장한 세션에 대해서 SESSIONID를 발급해 클라이언트의 쿠키로 저장
 * 클라이언트의 입장에서 보면 SESSINOID 쿠키를 이용해서 세션 데이터를 불러온다.
 * setCookie('SESSIONID') -> 쿠키에 세션ID 저장 ?
 * 서버에서 setCookie header에 세션id를 넣어서 주면 클라이언트에서는 쿠키에 세션id를 저장한다.
 * 세션id는 서버에서 생성한 세션을 식별하는 고유한 키
 * withcredentials: true -> 쿠키를 전달하도록 설정
 * 단, 이 때 저장한 세션에 대해서 SESSIONID를 발급해 클라이언트의 쿠키로 저장
 * 1. 깃헙 로그인 버튼 클릭
 * 2. 깃헙 로그인 페이지로 이동
 * 3. 깃헙 로그인 페이지에서 로그인을 하고, 깃헙에서 인증을 완료하면 깃헙에서 콜백 주소로 리다이렉트 시킨다.
 * 4. 콜백 주소로 리다이렉트 되면, 깃헙에서 인증을 완료한 사용자의 정보를 받아온다.
 * 5. 받아온 정보를 서버에 전달한다.
 * 6. 서버에서 받아온 정보를 기반으로 사용자를 생성한다.
 * 7. 사용자를 생성하고, 사용자 정보를 클라이언트에 전달한다.
 * 8. 클라이언트에서는 사용자 정보를 저장하고, 메인 페이지로 이동한다.
 * 9. 메인 페이지에서는 사용자 정보를 기반으로 로그인 상태를 유지한다.
 */
