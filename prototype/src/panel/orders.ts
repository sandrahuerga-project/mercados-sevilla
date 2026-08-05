import type { PanelOrder } from './types';

// Fake dataset for the demo: a normal morning at Pescadería Antonio.
export const INITIAL_ORDERS: PanelOrder[] = [
  {
    id: 'SGZ-2026-0387',
    customer: 'Carmen García',
    time: '9:04',
    items: [
      { qty: '½ kg', name: 'Boquerones frescos', price: '1,75 €' },
      { qty: '2 ud', name: 'Acedías limpias', price: '2,40 €' },
    ],
    fulfillment: 'Recogida',
    estimated: '4,15 €',
    state: 'nuevo',
  },
  {
    id: 'SGZ-2026-0388',
    customer: 'Rosa Morales',
    time: '8:47',
    items: [
      { qty: '1 kg', name: 'Gambas blancas', price: '18,00 €' },
      { qty: '1 kg', name: 'Coquinas', price: '9,60 €' },
    ],
    fulfillment: 'Taquilla',
    estimated: '27,60 €',
    state: 'preparando',
  },
  {
    id: 'SGZ-2026-0389',
    customer: 'Manolo Ruiz',
    time: '8:20',
    items: [
      { qty: '½ kg', name: 'Boquerones frescos', price: '1,75 €' },
      { qty: '1 kg', name: 'Sardinas', price: '5,00 €' },
    ],
    fulfillment: 'Recogida',
    estimated: '6,75 €',
    state: 'por-cobrar',
    finalTotal: '6,80 €',
  },
  {
    id: 'SGZ-2026-0412',
    customer: 'David Ortiz',
    time: '21:40',
    items: [{ qty: '1 kg', name: 'Gambas blancas', price: '18,00 €' }],
    fulfillment: 'Reparto',
    estimated: '18,00 €',
    state: 'aceptado',
  },
];

export const STATE_LABEL: Record<PanelOrder['state'], string> = {
  nuevo: 'NUEVO',
  aceptado: 'ACEPTADO',
  preparando: 'PREPARANDO',
  'por-cobrar': 'POR COBRAR',
  entregado: 'ENTREGADO',
  incidencia: 'INCIDENCIA',
};

// border-left colour per state (PORTFOLIO_DESIGN.md Organism 03)
export const STATE_COLOR: Record<PanelOrder['state'], string> = {
  nuevo: '#E63946',
  aceptado: '#52B788',
  preparando: '#F4A533',
  'por-cobrar': '#2D6A4F',
  entregado: '#8696A0',
  incidencia: '#FF9F1C',
};
