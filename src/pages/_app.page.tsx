import type { AppProps } from 'next/app';
import QueryProvider from '../utils/QueryProvider';
import { CookiesProvider } from 'react-cookie';
import '@/styles/globals.scss';
import Layout from '@/components/Common/Layout';
import Head from 'next/head';
import '@uiw/react-md-editor/markdown-editor.css';
import { Provider as ReduxToolkitProvider } from 'react-redux';
import store from '@/redux/store';
import Toast from '@/components/Common/Toast';
import LoginModal from '@/components/Common/LoginModal';

export default function App({ Component, pageProps }: AppProps) {
  const useLayout = !pageProps.noLayout;
  return (
    <>
      <Head>
        <title>Cosmos</title>
      </Head>
      <CookiesProvider>
        <QueryProvider>
          <ReduxToolkitProvider store={store}>
            {useLayout ? (
              <Layout>
                <Component {...pageProps} />
                <Toast />
                <LoginModal />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </ReduxToolkitProvider>
        </QueryProvider>
      </CookiesProvider>
      <div id="modal-root" />
    </>
  );
}
