export const copy = {
  meta: {
    title: 'Nebula One',
    description:
      'Nebula One combina materiales inteligentes y un chip cuántico híbrido para una experiencia fluida, intuitiva y realmente personal.',
    canonical: 'https://nebula-one.example.com'
  },
  navbar: {
    logoLabel: 'Nebula One',
    links: [
      { id: 'intro', label: 'Introducción' },
      { id: 'personaliza', label: 'Configura' },
      { id: 'colores', label: 'Colores' },
      { id: 'especificaciones', label: 'Especificaciones' },
      { id: 'cta', label: 'Reservar' },
    ],
    betaLabel: 'Beta Dev'
  },
  hero: {
    kicker: 'Nuevo',
    title: 'Nebula One',
    subtitle:
      'Una pieza de ingeniería suave como la luz. Potencia cuántica, batería adaptativa y audio inmersivo en 6 mm de espesor.',
    ctaPrimary: { label: 'Reserva ahora', href: '#cta' },
    ctaSecondary: { label: 'Ver video', href: '#video' },
    finePrint: 'Entrega estimada a partir de noviembre. Stock limitado.',
    metrics: [
      {
        value: '1.2M+ ',
        label: 'micro sensores',
        description: 'Lecturas biométricas por segundo para anticiparse a tu intención.'
      },
      {
        value: '8.5 g',
        label: 'peso lunar',
        description: 'Un equilibrio perfecto entre materiales ultraligeros y solidez estructural.'
      },
      {
        value: '6 mm',
        label: 'perfil esbelto',
        description: 'Curvatura 3D moldeada con precisión para un agarre impecable.'
      }
    ]
  },
  productIntro: {
    eyebrow: 'Diseño que respira',
    title: 'La simplicidad como superpoder',
    body:
      'Una superficie de cristal líquido microtexturizado se ajusta a cada gesto. El nuevo chip Nebula M2 coordina sensores biométricos en tiempo real para ofrecerte un sistema operativo que reacciona a tu intención antes de tocar la pantalla.',
    badges: ['Titanio cerámico', 'Audio espacial 360º', 'IA contextual'],
    features: [
      'Modos ambientales que modulan luz y temperatura para cada contexto.',
      'Cancelación neural que atenúa el ruido sin aislarte de tu entorno.',
      'Gestos invisibles: responde con micro movimientos sin levantar la voz.'
    ],
    mediaCaption: 'Nebula One sobre una superficie de cristal líquido'
  },
  configurator: {
    title: 'Configura tu Nebula One',
    description:
      'Elige la memoria neural, la capacidad energética y el acabado cromático que mejor represente tu estilo. Cada opción mantiene el equilibrio entre autonomía y presencia.',
    options: {
      storage: [
        { label: '256 GB HoloFlash', value: '256' },
        { label: '512 GB HoloFlash', value: '512' },
        { label: '1 TB HoloFlash', value: '1024' }
      ],
      energy: [
        { label: 'Edge Core 24h', value: 'standard' },
        { label: 'Edge Core 36h', value: 'extended' }
      ],
      colors: [
        { label: 'Aurora Prism', value: 'aurora', hex: '#5c7cff' },
        { label: 'Void Black', value: 'void', hex: '#0a0a0f' },
        { label: 'Ember Glass', value: 'ember', hex: '#ff6b4a' },
        { label: 'Lunaris Pearl', value: 'lunaris', hex: '#c7d2ff' }
      ]
    },
    summaryHeading: 'Tu Nebula One queda así:',
    pricing: {
      base: 1299,
      storage: {
        '256': 0,
        '512': 180,
        '1024': 420
      },
      energy: {
        standard: 0,
        extended: 220
      }
    },
    shipping: 'Envío prioritario estimado en 2-3 semanas para reservas confirmadas.'
  },
  colorPicker: {
    title: 'Elige un color que no has visto antes',
    description:
      'Pigmentos nanoscópicos que reaccionan a la luz. Cada acabado refleja un estado de ánimo diferente, desde el amanecer polar hasta la noche volcánica.',
    colors: [
      {
        id: 'aurora',
        name: 'Aurora Prism',
        hex: '#5c7cff',
        poem: 'Refleja auroras polares en gradientes que cambian con tu ritmo circadiano.',
        tagline: 'Brillo boreal y reflejos en capas vivas'
      },
      {
        id: 'void',
        name: 'Void Black',
        hex: '#0a0a0f',
        poem: 'Absorbe la luz en capas profundas como un eclipse permanente y elegante.',
        tagline: 'Oscuridad controlada con destellos metálicos'
      },
      {
        id: 'ember',
        name: 'Ember Glass',
        hex: '#ff6b4a',
        poem: 'Tonálidad cálida que recuerda brasas flotando, lista para tu próxima idea.',
        tagline: 'Ámbar líquido con calor suspendido'
      },
      {
        id: 'lunaris',
        name: 'Lunaris Pearl',
        hex: '#c7d2ff',
        poem: 'Perlados suaves con destellos plateados que respiran con cada notificación.',
        tagline: 'Neblina plateada con destellos polares'
      }
    ]
  },
  believe: {
    title: 'Ver para creer',
    subtitle: 'Perspectivas que flotan, texturas que responden al tacto.',
    slides: [
      {
        id: 'hover',
        title: 'Nebula One en suspensión',
        description: 'Nebula One suspendido en un campo de luz cinética que responde a cada gesto.',
        imageAlt: 'Nebula One suspendido en un campo de luz cinética.'
      },
      {
        id: 'haptics',
        title: 'Módulo háptico vivo',
        description: 'Detalle del módulo háptico con pulsos luminosos que sincronizan audio y tacto.',
        imageAlt: 'Detalle del módulo háptico con pulsos luminosos.'
      },
      {
        id: 'ambient',
        title: 'Interfaz ambiental',
        description: 'Interfaz ambiental adaptándose al ritmo circadiano con capas de brillo contextual.',
        imageAlt: 'Interfaz ambiental adaptándose al ritmo circadiano.'
      }
    ]
  },
  techSpecs: {
    title: 'Especificaciones que definen la próxima década',
    description:
      'Cada modo recalibra los núcleos sensoriales y energéticos para acompañar tu flujo creativo sin comprometer estabilidad.',
    toggle: {
      left: { id: 'performance', label: 'Performance' },
      right: { id: 'battery', label: 'Batería' }
    },
    counters: [
      { label: '0-100% en', value: 18, unit: 'min' },
      { label: 'Neurociclos', value: 42, unit: 'TOPS' },
      { label: 'Autonomía activa', value: 36, unit: 'h' }
    ],
    ariaLive: 'Las especificaciones se actualizan al cambiar de modo.'
  },
  cta: {
    title: 'Nebula One está listo para tu siguiente salto',
    description:
      'Sé parte de la primera generación que experimenta un dispositivo que se adapta a tu intención. Recibe acceso anticipado a accesorios exclusivos.',
  button: { label: 'Quiero reservar', href: '/reservar' },
    legal: 'Precio provisional. Las características finales pueden variar en el lanzamiento.'
  },
  reservation: {
    badge: 'Reserva anticipada',
    title: 'Confirma tu acceso prioritario',
    description:
      'Personaliza tu reserva para recibir la invitación de compra cuando inicie la primera ola de entregas. Selecciona el acabado que más te inspira y dinos dónde quieres recibirlo.',
    note: 'Las reservas son gratuitas y no implican pago inmediato. Te avisaremos con 48 horas de anticipación antes de liberar las primeras unidades.',
    perks: [
      {
        label: 'Entrega estimada',
        value: 'Comienza en enero 2026',
        description: 'Recibirás una ventana precisa una vez aprobemos tu solicitud.'
      },
      {
        label: 'Accesorios exclusivos',
        value: 'Kit inmersivo Nebula',
        description: 'Incluye funda fotocromática y cargador háptico de escritorio.'
      }
    ],
    timeline: [
      {
        title: 'Solicitud',
        description: 'Comparte tus preferencias y región de entrega.'
      },
      {
        title: 'Confirmación',
        description: 'Un especialista te enviará los siguientes pasos en menos de 48 horas.'
      },
      {
        title: 'Entrega',
        description: 'Coordinamos la ventana exacta y los accesorios que acompañarán tu dispositivo.'
      }
    ],
    regions: [
      'Latinoamérica',
      'Norteamérica',
      'Europa',
      'Asia Pacífico',
      'Medio Oriente'
    ],
    form: {
      submitLabel: 'Enviar solicitud',
      loadingLabel: 'Enviando reserva',
      phoneLabel: 'Teléfono de contacto',
      phonePlaceholder: '+52 55 1234 5678',
      phoneHelper: 'Incluye tu código de país. Solo lo usaremos para coordinar la entrega.',
      notesHelper: 'Máximo 280 caracteres.',
      successTitle: 'Reserva recibida',
      successBody:
        'Te contactaremos por correo para confirmar disponibilidad y la fecha exacta de entrega.',
      previewTitle: 'Resumen preliminar',
      previewDescription:
        'Revisa que el acabado y la memoria coincidan con lo que planeas recibir. Podrás ajustar los detalles antes del pago final.',
      supportTitle: 'Concierge Nebula',
      supportBody:
        '¿Tienes dudas? Nuestro equipo puede ayudarte a personalizar accesorios o coordinar la entrega perfecta.',
      supportAction: 'Escríbenos'
    },
    legal: 'Al enviar, aceptas que Nebula Labs te contacte con novedades sobre disponibilidad y accesorios oficiales.'
  },
  footer: {
    legal: '© 2025 Nebula Labs. Algunos efectos visuales son simulaciones. Batería medida en pruebas internas.',
    links: [
      { label: 'Soporte', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'Términos', href: '#' }
    ],
    contact: {
      email: 'contacto@nebula-one.example.com',
      press: 'prensa@nebula-one.example.com',
      phone: '+52 55 5555 5555'
    }
  }
};

type Copy = typeof copy;
export type NavigationLink = Copy['navbar']['links'][number];
