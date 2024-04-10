import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import QueryProvider from '../Utils/QueryProvider';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </CookiesProvider>
  );
}