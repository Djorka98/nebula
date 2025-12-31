import type { PropsWithChildren } from 'react';
import { Helmet, HelmetProvider as AsyncHelmetProvider } from 'react-helmet-async';

const DEFAULT_TITLE = 'Nebula One — Innovación sin límites';
const DEFAULT_DESCRIPTION =
  'Descubre Nebula One, el dispositivo que redefine la relación entre diseño, rendimiento y experiencia.';

export const HelmetProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <AsyncHelmetProvider>
      <Helmet defaultTitle={DEFAULT_TITLE} titleTemplate="%s | Nebula One">
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/src/assets/images/device@2x.webp" />
        <meta property="og:site_name" content="Nebula One" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content="/src/assets/images/device@2x.webp" />
      </Helmet>
      {children}
    </AsyncHelmetProvider>
  );
};
