import React, { useState } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { FlowPlayer } from './FlowPlayer';
import type { FlowScript } from './types';

interface FlowScreenProps {
  script: FlowScript;
  /**
   * Título y descripción visibles sobre el móvil. Obligatorios y sin valor por
   * defecto a propósito: antes caían en `script.label`, que es el nombre interno
   * del JSON («C05 Multi-puesto»), y eso es jerga, no copy de portfolio. Salen
   * de flowCatalog.ts, igual que la lista y el mapa.
   */
  label: string;
  description: string;
}

// Pantalla genérica: PhoneFrame + FlowPlayer alimentados por un script JSON.
export const FlowScreen: React.FC<FlowScreenProps> = ({ script, label, description }) => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame
        id={`phone-${script.id.toLowerCase()}`}
        title={script.phone.title}
        subtitle={script.phone.subtitle}
        persona={script.phone.persona}
        avatarBg={script.phone.avatarBg}
        flowLabel={label}
        flowDescription={description}
      >
        <FlowPlayer script={script} resetKey={resetKey} />
      </PhoneFrame>
      <button
        onClick={() => setResetKey((k) => k + 1)}
        className="mt-4 font-narrow text-base font-semibold text-cream/70 hover:text-cream border border-cream/25 hover:border-cream/60 px-4 py-2 rounded-full transition-colors cursor-pointer"
      >
        Reiniciar
      </button>
    </div>
  );
};
