import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from '@/styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Taskify</title>
        <meta name="description" content="스마트하게 나의 일정을 관리해봅시다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo_icon.svg" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
      <div id="modal"></div>
    </QueryClientProvider>
  );
}
