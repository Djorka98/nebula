import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { StickyViewport } from '@/components/StickyViewport/StickyViewport';

const Hero = lazy(() => import('@/sections/Hero/Hero'));
const ProductIntro = lazy(() => import('@/sections/ProductIntro/ProductIntro'));
const TechSpecs = lazy(() => import('@/sections/TechSpecs/TechSpecs'));
const Believe = lazy(() => import('@/sections/Believe/Believe'));
const CTA = lazy(() => import('@/sections/CTA/CTA'));
const ReservationSection = lazy(() => import('@/sections/Reservation/Reservation'));
const Configurator = lazy(() => import('@/features/Configurator/Configurator'));
const ColorPicker = lazy(() => import('@/features/ColorPicker/ColorPicker'));

const Landing = () => {
  return (
    <Suspense fallback={<div role="status" aria-live="polite">Cargando experiencia...</div>}>
      <Navbar />
      <main>
        <StickyViewport>
          <Hero />
        </StickyViewport>
        <ProductIntro />
        <Configurator />
        <ColorPicker />
        <TechSpecs />
        <Believe />
        <CTA />
      </main>
      <Footer />
    </Suspense>
  );
};

const ReservationPage = () => {
  return (
    <Suspense fallback={<div role="status" aria-live="polite">Cargando experiencia...</div>}>
      <Navbar />
      <main>
        <ReservationSection />
      </main>
      <Footer />
    </Suspense>
  );
};

export const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/reservar',
      element: <ReservationPage />
    }
  ]);
};
