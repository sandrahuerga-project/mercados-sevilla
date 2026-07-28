// Flow scripts: each flow is data (JSON), the FlowPlayer renders it turn by turn.
// Copy source of truth: DESIGN.md §7 (catálogo de mensajes).

export interface PhoneMeta {
  title: string;
  subtitle?: string;
  avatarIcon?: string;
  avatarBg?: string;
}

export type FlowStep =
  | { kind: 'date'; text: string; next: string }
  | {
      kind: 'bot';
      text: string;
      puesto?: string;
      timestamp: string;
      warning?: boolean;
      next: string | null;
    }
  | { kind: 'user'; text: string; timestamp: string; next: string | null }
  | { kind: 'human'; name: string; text: string; timestamp: string; next: string | null }
  | {
      kind: 'system';
      text: string;
      tone?: 'default' | 'blue' | 'yellow';
      next: string | null;
    }
  | {
      kind: 'audio';
      sender: 'bot' | 'user';
      duration: string;
      timestamp: string;
      next: string | null;
    }
  | { kind: 'buttons'; timestamp?: string; buttons: { label: string; next: string }[] }
  | {
      kind: 'video';
      puesto: string;
      timestamp: string;
      caption: string;
      footer?: string;
      duration: string;
      imageUrl?: string;
      next: string | null;
    }
  | { kind: 'waflow'; ctaLabel: string; next: string }
  | { kind: 'end'; note?: string };

export interface FlowScript {
  id: string;
  label: string;
  description: string;
  phone: PhoneMeta;
  start: string;
  steps: Record<string, FlowStep>;
}
