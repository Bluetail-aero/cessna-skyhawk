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
import { datadogRum } from '@datadog/browser-rum';

const root = ReactDOM.createRoot(document.getElementById('app'));

if (process.env.REACT_APP_SESSION_REPLAY_ENABLED) {
  datadogRum.init({
    applicationId: '1f1f72dc-b51d-4fc9-a4c5-1067513b2ce9',
    clientToken: 'pubae5ec82dd75c2740865c21566287c2d9',
    site: 'datadoghq.com',
    service: 'boom',
    env: process.env.REACT_APP_SESSION_REPLAY_env,
    // Specify a version number to identify the deployed version of your application in Datadog
    version: process.env.REACT_APP_VERSION,
    sampleRate: parseInt(process.env.REACT_APP_SESSION_REPLAY_sampleRate, 2),
    sessionReplaySampleRate: parseInt(process.env.REACT_APP_SESSION_REPLAY_sessionReplaySampleRate, 2),
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'allow'
  });

  datadogRum.startSessionReplayRecording();
  // eslint-disable-next-line no-console
  console.log('Starting DataDog Session Replay Recording');
}

root.render(
  <CacheProvider value={emotionCache}>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </CacheProvider>
);
