import axios from '@/api/axios';

export async function githubLogin(code: string) {
  try {
    const res = await axios.post(`/auth/github/redirect?code=${code}`);
    window.opener.location.reload();
    window.close();
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

export async function googleLogin(code: string) {
  try {
    const res = await axios.post(`/auth/google/redirect?code=${code}`);
    window.opener.location.reload();
    window.close();
  } catch (error) {
    console.error('요청 실패:', error);
  }
}
