import axios from '@/api/axios';

export default function githubLogin(code: string) {
  try {
    const res = axios.post(`/auth/github/redirect?code=${code}`);
  } catch (error) {
    console.error('요청 실패:', error);
  }
}
