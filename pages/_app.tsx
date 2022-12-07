import '../styles/globals.scss';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
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

const myFont = localFont({
  src: [
    {
      path: './fonts/Bonkus-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/Bonkus-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/Bonkus-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Bonkus-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Bonkus-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/Bonkus-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Bonkus-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
});

function MyApp({ Component, pageProps }: AppProps<IMyApp>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={myFont.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
