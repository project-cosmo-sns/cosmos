import React, { useEffect } from 'react';
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

  return <div>Redirect</div>;
}
