export interface SpecItem {
  label: string;
  value: string;
  description: string;
}

export type SpecCategory = 'performance' | 'battery';

export const specs: Record<SpecCategory, SpecItem[]> = {
  performance: [
    {
      label: 'Chip Nebula M2',
      value: '12 núcleos fusion',
      description: 'Arquitectura neuromórfica con GPU cuántica calibrada para IA contextual.'
    },
    {
      label: 'Memoria neural',
      value: '32 GB HoloRAM',
      description: 'Sincronización instantánea entre apps y experiencias inmersivas a 120 Hz.'
    },
    {
      label: 'Audio espacial',
      value: '360º adaptativo',
      description: 'Matriz multicapa con seguimiento ocular y filtros atmosféricos dinámicos.'
    }
  ],
  battery: [
    {
      label: 'Celdas inteligentes',
      value: 'Índigo Graphene',
      description: 'Microláminas auto-refrigeradas para carga fría constante.'
    },
    {
      label: 'Carga rápida',
      value: '0-70% en 12 min',
      description: 'Sistema HyperFlux con balance inteligente de temperatura.'
    },
    {
      label: 'Optimización',
      value: '+24% eficiencia',
      description: 'Aprendizaje automático en tiempo real según tu ritmo circadiano.'
    }
  ]
};
