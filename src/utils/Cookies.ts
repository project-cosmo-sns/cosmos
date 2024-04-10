import { Cookies } from 'react-cookie';

interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  partitioned?: boolean;
}

const cookies = new Cookies();

export const getCookie = (name: string) => cookies.get(name);

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions,
) => cookies.set(name, value, { ...options });

export const removeCookie = (name: string) => cookies.remove(name);
