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
  /**
   * Solo en los pedidos de reparto. Sale de la ficha del cliente, donde se
   * guardó la primera vez que pidió que se lo llevaran a casa: el bot la
   * recupera de ahí y el placero la ve tal cual la escribió el cliente.
   */
  direccion?: string;
  estimated: string;
  state: OrderState;
  finalTotal?: string;
  paidWith?: PaymentMethod;
}
