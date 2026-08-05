// Flow scripts: each flow is data (JSON), the FlowPlayer renders it turn by turn.
// Copy source of truth: DESIGN.md §7 (catálogo de mensajes).

import type { PersonaId } from '../shell/PersonaImage';

export interface PhoneMeta {
  title: string;
  subtitle?: string;
  /** Ilustración que hace de foto de perfil del negocio en la cabecera. */
  persona?: PersonaId;
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
  /**
   * List Message de WhatsApp: un mensaje con un botón que abre una hoja con
   * filas pulsables. Es el componente que toca cuando hay más de tres opciones
   * —elegir puesto, elegir mercado—, porque los reply buttons se quedan en tres.
   * Límites reales (wa-constraints.md §5): 10 filas en total contando todas las
   * secciones, 24 caracteres el título de fila, 72 la descripción y 20 el botón
   * que abre la lista.
   */
  | {
      kind: 'list';
      puesto?: string;
      timestamp: string;
      text: string;
      /** Texto del botón que abre la hoja. */
      buttonLabel: string;
      /** Encabezado de la hoja abierta. Por defecto, el del botón. */
      sheetTitle?: string;
      sections: {
        title: string;
        rows: { label: string; description?: string; next: string }[];
      }[];
    }
  | {
      kind: 'video';
      puesto: string;
      timestamp: string;
      caption: string;
      footer?: string;
      duration: string;
      /** Fotograma de portada. Con Cloudinary, el mismo vídeo con `so_2` y .jpg. */
      imageUrl?: string;
      /** Si viene, el play reproduce el vídeo de verdad en vez de quedarse en portada. */
      videoUrl?: string;
      /** 'user' cuando lo manda el propio placero (P02). Por defecto lo manda el puesto. */
      sender?: 'bot' | 'user';
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
