import axios from 'axios';
import { getCookie } from '@/utils/Cookies';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// instance.interceptors.request.use(
//   (config) => {
//     const sessionId = getCookie('sessionId');
//     if (sessionId) {
//       config.headers.Cookie = `sessionId=${sessionId}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

export default instance;
