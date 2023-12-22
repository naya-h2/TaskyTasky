import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from '@/styles/GlobalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taskify</title>
        <meta name="description" content="스마트하게 나의 일정을 관리해봅시다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo_small.svg" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
      <div id="modal"></div>
    </>
  );
}
