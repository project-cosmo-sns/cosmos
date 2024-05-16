import axios from 'axios';
import { useRouter } from 'next/router';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
