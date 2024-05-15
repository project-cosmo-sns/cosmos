import { baseURL } from '@/api/axios';

export default async function openAuthPopup(authType: string) {
  const name = 'LoginPopup';

  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const options = `width=${width},height=${height},top=${top},left=${left}`;

  window.open(`${baseURL}/auth/${authType}/login`, name, options);
}
