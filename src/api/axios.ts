import axios from 'axios';
import { getCookie } from '../Utils/Cookies';

const instance = axios.create({
  baseURL: 'https://cosmo-sns.vercel.app',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (window) console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
