import '../styles/globals.scss'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClientProvider, QueryClient } from 'react-query';



function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
