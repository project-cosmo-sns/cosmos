import axios from '@/api/axios';

export default async function githubLogin(code: string) {
  try {
    const res = await axios.post(`/auth/github/redirect?code=${code}`);
    if (res) {
      window.opener.location.reload();
      window.close();
    }
  } catch (error) {
    console.error('요청 실패:', error);
  }
}
