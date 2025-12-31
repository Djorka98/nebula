# Nebula One Landing

Experiencia de landing "presentación de producto" inspirada en el lenguaje visual de Apple. Construida con React 18, TypeScript y Vite, con animaciones premium y enfoque en accesibilidad y rendimiento.

## Stack y características

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: `react-router-dom` con carga perezosa de secciones
- **Animaciones**: Framer Motion para micro-interacciones, GSAP + ScrollTrigger para escenas core, Lenis para smooth scrolling con degradado para `prefers-reduced-motion`
- **Estilos**: vanilla-extract (tokens tipados + recetas tipográficas) + SCSS Modules por componente/sección
- **SEO**: `react-helmet-async` con meta tags base y OG/Twitter
- **Calidad**: ESLint + Prettier + Vitest + React Testing Library + Husky + lint-staged
- **Accesibilidad**: `:focus-visible`, ARIA labels, soporte completo a `prefers-reduced-motion`
- **Performance**: `<picture>` responsive, assets lazy, code splitting por secciones, helpers de parallax/scroll SSR-safe

## Instalación

```bash
npm install
```

## Scripts útiles

```bash
npm run dev       # entorno de desarrollo con Vite
npm run build     # build de producción (tsc + vite)
npm run preview   # previsualización local del build
npm run lint      # ESLint con reglas estrictas (sin warnings)
npm run format    # Prettier sobre todo el repositorio
npm run typecheck # tsc --noEmit
npm run test      # Vitest en modo run
npm run coverage  # Vitest con coverage
npm run analyze   # Build + visualización de bundle (rollup-plugin-visualizer)
```

> Husky ejecutará `lint-staged` en cada commit, formateando y corrigiendo únicamente los archivos afectados.

## Estructura principal

```
src/
  app/            # App shell, rutas y providers (Helmet/Motion)
  animations/     # GSAP helpers, componentes motion y utilidades parallax
  components/     # UI atómica (Button, Navbar, etc.) con SCSS Modules
  sections/       # Secciones hero/product/gallery/cta, independientes y lazy
  features/       # Módulos interactivos (Configurator, ColorPicker)
  hooks/          # Hooks reutilizables (prefersReducedMotion, sectionInView)
  styles/         # tokens (vanilla-extract), tipografía, resets y SCSS globales
  data/           # Copy y specs demo
  assets/         # Imágenes/WebP, SVGs, video placeholder
```

## Cómo crear nuevas secciones

1. Crea una carpeta en `src/sections/NuevaSeccion` con `*.tsx`, `*.module.scss` y opcionalmente archivos de animación.
2. Usa las recetas de `typography.css.ts` y los tokens desde `tokens.css.ts` para mantener consistencia.
3. Consume hooks como `usePrefersReducedMotion` y helpers de `animations/` para animaciones accesibles.
4. Registra la sección en `app/routes.tsx` mediante `React.lazy` para mantener el split por ruta.
5. Añade copy/data en `src/data` para separar contenido de presentación.

## Guía de tokens y tipografía

- Los **tokens globales** viven en `src/styles/tokens.css.ts`. Importa `vars` en archivos TypeScript/TSX cuando necesites un valor tipado (`vars.color.brand`, `vars.spacing[4]`, etc.). En SCSS Modules usa directamente las variables CSS generadas (`var(--color-brand)`, `var(--spacing-4)`, `var(--radii-lg)`, etc.).
- `reset.scss` y `globals.scss` se cargan en `main.tsx` junto con `tokens.css.ts` y `animations.scss`, por lo que cualquier componente hereda el sistema de diseño automáticamente.
- Usa las clases utilitarias de `globals.scss` (`.container`, `.h-display`, `.h-hero`, `.h-xxl`, `.body-lg`, `.body-md`, `.hr`) para alinear tipografías y layout rápidamente en secciones.
- Las animaciones clave (`fade-in`, `slide-up`, `scale-in`, `reveal-blur`) y sus helpers (`.motion-fade-in`, `.motion-slide-up`, etc.) están definidas en `animations.scss`. Respeta `prefers-reduced-motion` y reusa los tokens de duración y easing.
- Los mixins reutilizables (`mixins.scss`) permiten aplicar efectos de vidrio, gradientes de borde y layouts responsivos basados en clamp; impórtalos dentro de cada SCSS Module según sea necesario.

## Añadir animaciones custom

- Usa `FadeIn`, `SlideUp`, `ScaleIn` de `animations/motion.tsx` para micro interacciones declarativas.
- Para escenas con scroll, importa `pinSection`, `timelineFromTo` y `matchMediaBreakpoints` desde `animations/scroll.ts` (todas SSR-safe y con cleanup automático).
- `animations/parallax.ts` expone `parallaxStyle` para mapear progreso de scroll a transforms usando `lerp` y `clamp`.

## Placeholder de video

El archivo `src/assets/video/demo.mp4` es un marcador de posición. Sustituir por el vídeo real (mismo nombre) antes de desplegar.

## Comandos de ejemplo (setup manual)

```bash
npm create vite@latest iphone-landing -- --template react-ts
cd iphone-landing
npm i react-router-dom framer-motion lenis gsap react-helmet-async clsx
npm i -D sass vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom \
       eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks \
       eslint-plugin-import eslint-plugin-jsx-a11y husky lint-staged \
       vanilla-extract-css vanilla-extract-vite-plugin @vanilla-extract/css @vanilla-extract/recipes \
       @types/node @types/gsap
npx husky install
npm run dev
```

## Decisiones de diseño

- **Tokens centralizados** en vanilla-extract para permitir theming tipado y reutilización en SCSS Modules mediante variables CSS.
- **Animaciones degradables**: hooks verifican `prefers-reduced-motion`, y Lenis se desactiva automáticamente para accesibilidad.
- **Arquitectura modular**: secciones independientes, features compartidas y providers dedicados (Helmet/Motion) simplifican la extensión.
- **Rendimiento**: imágenes WebP responsive y textos lazy, ScrollTrigger solo se carga en cliente cuando es necesario.

## Cómo ejecutar pruebas

```bash
npm run test
```

Para coverage:

```bash
npm run coverage
```

## Licencia

Uso interno/demo. Sustituye contenido y assets antes de un despliegue público.
