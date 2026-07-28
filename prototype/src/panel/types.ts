// Placero panel (Antonio) — web app, NOT WhatsApp. No Meta constraints apply here.
// Functional spec: DESIGN.md §4. Visual skin: PORTFOLIO_DESIGN.md Organism 03.

export type OrderState =
  | 'nuevo'
  | 'aceptado'
  | 'preparando'
  | 'por-cobrar'
  | 'entregado'
  | 'incidencia';

export type PaymentMethod = 'Efectivo' | 'Bizum' | 'Tarjeta';

export interface OrderItem {
  qty: string;
  name: string;
  price: string;
}

export interface PanelOrder {
  id: string;
  customer: string;
  time: string;
  items: OrderItem[];
  fulfillment: 'Recogida' | 'Taquilla' | 'Reparto';
  estimated: string;
  state: OrderState;
  finalTotal?: string;
  paidWith?: PaymentMethod;
}
