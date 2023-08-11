import React from 'react';
import ReactDOM from 'react-dom/client';

/* eslint-disable import/no-unresolved */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tippy.js/dist/tippy.css';
/* eslint-enable import/no-unresolved */

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@emotion/react';
import Router from 'router/Base';
import { emotionCache } from 'common/const/emotion';
import { queryClient } from 'common/const/queryClient';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <CacheProvider value={emotionCache}>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </CacheProvider>
);
