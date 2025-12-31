import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app/App';
import { HelmetProvider } from '@/app/providers/Helmet';
import { MotionProvider } from '@/app/providers/MotionProvider';

import '@/styles/tokens.css';
import '@/styles/reset.scss';
import '@/styles/globals.scss';
import '@/styles/animations.scss';
import '@/styles/utilities.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <MotionProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <App />
        </BrowserRouter>
      </MotionProvider>
    </HelmetProvider>
  </React.StrictMode>
);
