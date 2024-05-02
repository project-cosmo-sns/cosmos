import type { AppProps } from 'next/app';
import QueryProvider from '../utils/QueryProvider';
import { CookiesProvider } from 'react-cookie';
import '@/styles/globals.scss';
import Layout from '@/components/Common/Layout';
import Head from 'next/head';
import '@uiw/react-md-editor/markdown-editor.css';

export default function App({ Component, pageProps }: AppProps) {
  const useLayout = !pageProps.noLayout;
  return (
    <>
      <Head>
        <title>Cosmos</title>
      </Head>
      <CookiesProvider>
        <QueryProvider>
          {useLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </QueryProvider>
      </CookiesProvider>
      <div id="modal-root" />
      <div id="popover-root" />
    </>
  );
}
