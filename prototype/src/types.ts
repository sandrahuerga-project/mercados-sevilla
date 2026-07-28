export interface OnboardingData {
  nombre: string;
  cp: string;
  mercadoFav: string;
  puestosInteres: string[];
  recibirVideo: boolean;
}

export interface Message {
  id: string;
  sender: 'bot' | 'user' | 'system' | 'fali';
  text?: string;
  timestamp: string;
  type?: 'text' | 'image' | 'video' | 'audio' | 'summary' | 'flow-trigger' | 'status-pill';
  avatar?: string;
  mediaUrl?: string;
  duration?: string;
  buttons?: string[];
  summaryItems?: { name: string; qty: string; price: string }[];
  totalPrice?: string;
  fulfillment?: string;
  paymentType?: string;
}

export interface FlowState {
  c01: {
    isOpen: boolean;
    step: 1 | 2 | 3;
    data: OnboardingData;
    isFinished: boolean;
  };
  c02: {
    selectedOption: string | null;
    isTyping: boolean;
  };
  c11: {
    status: 'pending' | 'confirmed' | 'modifying';
  };
  c07: {
    step: number; // 0: initial, 1: accepted, 2: ready, 3: completed
  };
  c03: {
    step: 'broadcast' | 'ordering' | 'structured' | 'fulfillment' | 'confirmed';
    userMessage: string;
    fulfillmentType: string | null;
  };
}
