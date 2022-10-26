import '../styles/globals.scss';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
  DehydratedState,
} from '@tanstack/react-query';
import { Layout } from '../components';

interface IMyApp {
  dehydratedState: DehydratedState;
}

function MyApp({ Component, pageProps }: AppProps<IMyApp>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
