import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { BotBubble, DateSeparator, ReplyButtons, SystemPill, UserBubble } from './ChatBubbles';

export const C11EscaladoScreen: React.FC = () => {
  const [escaladoState, setEscaladoState] = useState<'pending' | 'confirmed' | 'modifying'>('pending');

  const handleConfirm = (btnLabel: string) => {
    if (btnLabel === '✓ Confirmar') {
      setEscaladoState('confirmed');
    } else {
      setEscaladoState('modifying');
    }
  };

  const handleReset = () => {
    setEscaladoState('pending');
  };

  return (
    <PhoneFrame
      id="phone-c11"
      title="Pescadería Fali"
      subtitle="Fali responderá pronto • En línea"
      avatarIcon="ph ph-fish"
      avatarBg="bg-sevilla-tile"
      flowLabel="C11 Escalado"
      flowDescription="Handover a placero real con enrutamiento de vuelta"
    >
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1">
          <DateSeparator text="HOY" />

          {/* User asks a specific question that NLU cannot safely answer on its own */}
          <UserBubble timestamp="09:12">
            ¿Las acedías de hoy son de Sanlúcar?
          </UserBubble>

          {/* Bot triggers handoff and notifies user of delay */}
          <BotBubble 
            puestoName="Pescadería Fali Asistente"
            timestamp="09:12"
            hasTail={true}
          >
            Te paso con Fali directamente. Suele responder en 5-10 min.
          </BotBubble>

          {/* Centered Pill system indicating human handover */}
          <SystemPill 
            type="blue"
            text="— Fali se ha unido a la conversación —" 
          />

          {/* Human Message: Visually distinct from bot */}
          <div className="flex flex-col items-start my-1.5 px-3 relative animate-fade-in">
            {/* Tag says Fali (Placero) to represent human operator */}
            <div className="flex items-center space-x-1.5 mb-0.5 ml-2">
              <span className="text-[11px] font-bold text-sevilla-tile">
                Fali
              </span>
              <span className="text-[9px] bg-sevilla-tile/10 text-sevilla-tile border border-sevilla-tile/20 px-1 py-0.2 rounded font-semibold">
                PLACERO REAL
              </span>
            </div>
            
            {/* Lighter border or slight variation for human voice */}
            <div className="relative max-w-[82%] px-3 py-2 bg-white text-zinc-800 text-[13.5px] leading-relaxed shadow-bubble rounded-2xl rounded-tl-none border-l-4 border-sevilla-tile bubble-tail-bot">
              Hola Carmen, sí, llegaron esta mañana de la lonja de Sanlúcar. Son de categoría. ¿Te aparto medio kilo?
              
              <div className="text-right mt-1 select-none flex items-center justify-end space-x-1">
                <span className="text-[9.5px] text-zinc-400 font-mono">09:15</span>
              </div>
            </div>
          </div>

          {/* User replies to the human placero */}
          <UserBubble timestamp="09:16">
            Sí porfa, para mañana.
          </UserBubble>

          {/* Centered Pill system indicating human passes control back to bot */}
          <SystemPill 
            type="blue"
            text="— Fali ha pasado el chat al asistente —" 
          />

          {/* Bot resumes the context and structures the order details */}
          <BotBubble 
            puestoName="Pescadería Fali Asistente"
            timestamp="09:17"
          >
            Apuntado. ½ kg acedías de Sanlúcar para recogida mañana 10:00. ¿Confirmas?
          </BotBubble>

          {/* Action buttons */}
          {escaladoState === 'pending' && (
            <ReplyButtons 
              buttons={['✓ Confirmar', '✏️ Modificar']} 
              onButtonClick={handleConfirm}
            />
          )}

          {escaladoState === 'confirmed' && (
            <>
              <UserBubble timestamp="09:17">
                ✓ Confirmar
              </UserBubble>
              <BotBubble 
                puestoName="Pescadería Fali Asistente"
                timestamp="09:18"
              >
                ✅ ¡Pedido confirmado! *#SGZ-2026-0387*.\n\nFali empezará a prepararlo mañana a primera hora. Te avisamos en cuanto lo pese y empaquete. ¡Gracias por comprar en San Gonzalo!
              </BotBubble>
            </>
          )}

          {escaladoState === 'modifying' && (
            <>
              <UserBubble timestamp="09:17">
                ✏️ Modificar
              </UserBubble>
              <BotBubble 
                puestoName="Pescadería Fali Asistente"
                timestamp="09:18"
              >
                Entendido, Carmen. Escríbeme qué quieres modificar. Por ejemplo: *"ponme un kilo"* o *"para el viernes en vez de mañana"*.
              </BotBubble>
            </>
          )}
        </div>

        {/* Reset button */}
        <div className="mt-auto pt-4 flex justify-center select-none">
          <button 
            onClick={handleReset}
            className="text-[10px] bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-600 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
          >
            🔄 Reiniciar Simulación C11
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
};
