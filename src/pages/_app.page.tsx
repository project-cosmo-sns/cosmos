import type { AppProps } from 'next/app';
import QueryProvider from '../utils/QueryProvider';
import { CookiesProvider } from 'react-cookie';
import '../styles/globals.scss';
import Layout from '@/components/Common/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryProvider>
    </CookiesProvider>
  );
}
