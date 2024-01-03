import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from '@/styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import PageSpinner from '@/components/common/Spinner/PageSpinner';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>TaskyTasky</title>
        <meta name="description" content="스마트하게 나의 일정을 관리해봐요. TaskyTasky와 함께!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo_icon.svg" />
      </Head>
      <GlobalStyles />
      {isLoading ? <PageSpinner /> : <Component {...pageProps} />}
      <div id="modal"></div>
    </QueryClientProvider>
  );
}
