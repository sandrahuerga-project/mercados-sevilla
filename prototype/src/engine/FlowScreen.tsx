import React, { useState } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { FlowPlayer } from './FlowPlayer';
import type { FlowScript } from './types';

// Generic screen: PhoneFrame + FlowPlayer driven by a flow script (JSON).
export const FlowScreen: React.FC<{ script: FlowScript }> = ({ script }) => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame
        id={`phone-${script.id.toLowerCase()}`}
        title={script.phone.title}
        subtitle={script.phone.subtitle}
        avatarIcon={script.phone.avatarIcon}
        avatarBg={script.phone.avatarBg}
        flowLabel={script.label}
        flowDescription={script.description}
      >
        <FlowPlayer script={script} resetKey={resetKey} />
      </PhoneFrame>
      <button
        onClick={() => setResetKey((k) => k + 1)}
        className="mt-3 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
      >
        Reiniciar {script.id}
      </button>
    </div>
  );
};
