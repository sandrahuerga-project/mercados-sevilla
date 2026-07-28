import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { BotBubble, DateSeparator, ReplyButtons, SystemPill, UserBubble } from './ChatBubbles';

export const C07TrackingScreen: React.FC = () => {
  const [activeActions, setActiveActions] = useState<{
    comoLlegar: boolean;
    avisadoFali: boolean;
    valorado: boolean;
    repetido: boolean;
  }>({
    comoLlegar: false,
    avisadoFali: false,
    valorado: false,
    repetido: false
  });

  const handleAction = (label: string) => {
    if (label === 'Cómo llegar') {
      setActiveActions(prev => ({ ...prev, comoLlegar: true }));
      setTimeout(() => {
        // Simulating redirect or browser action
        window.open('https://maps.google.com/?q=Mercado+San+Gonzalo+Sevilla', '_blank');
      }, 800);
    } else if (label === 'Avisar a Fali') {
      setActiveActions(prev => ({ ...prev, avisadoFali: true }));
    } else if (label === 'Valorar a Fali') {
      setActiveActions(prev => ({ ...prev, valorado: true }));
    } else if (label === 'Repetir') {
      setActiveActions(prev => ({ ...prev, repetido: true }));
    }
  };

  const handleReset = () => {
    setActiveActions({
      comoLlegar: false,
      avisadoFali: false,
      valorado: false,
      repetido: false
    });
  };

  return (
    <PhoneFrame
      id="phone-c07"
      title="Mercados de Sevilla"
      subtitle="Utilidades de pedido • En línea"
      avatarIcon="ph ph-storefront"
      avatarBg="bg-mercado-green"
      flowLabel="C07 Tracking"
      flowDescription="Notificaciones utility automáticas a lo largo del día"
    >
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1">
          <DateSeparator text="PEDIDO #SGZ-2026-0387" />

          {/* 10:15 Notification */}
          <SystemPill text="— 10:15 —" />
          <BotBubble 
            puestoName="Asistente de Mercados"
            timestamp="10:15"
          >
            ✅ Fali ha aceptado tu pedido *#SGZ-2026-0387*. Empieza a prepararlo.
          </BotBubble>

          {/* 11:40 Notification */}
          <SystemPill text="— 11:40 —" />
          <BotBubble 
            puestoName="Asistente de Mercados"
            timestamp="11:40"
          >
            📦 Tu pedido está listo. Puedes recogerlo en Pescadería Fali, Mercado San Gonzalo. Abierto hasta las 14:00.
          </BotBubble>

          {!activeActions.comoLlegar && !activeActions.avisadoFali && (
            <ReplyButtons 
              buttons={['Cómo llegar', 'Avisar a Fali']} 
              onButtonClick={handleAction}
            />
          )}

          {activeActions.comoLlegar && (
            <SystemPill 
              type="blue"
              text="🗺️ Redirigiendo a Google Maps (Mercado San Gonzalo)..." 
            />
          )}

          {activeActions.avisadoFali && (
            <>
              <UserBubble timestamp="11:41">
                Avisar a Fali
              </UserBubble>
              <BotBubble puestoName="Asistente de Mercados" timestamp="11:41">
                Avisado. Fali sabe que vas de camino. Tendrá tu pedido a mano en el mostrador para entregártelo en 5 segundos. 🐟
              </BotBubble>
            </>
          )}

          {/* 12:30 Notification */}
          <SystemPill text="— 12:30 —" />
          <BotBubble 
            puestoName="Asistente de Mercados"
            timestamp="12:30"
          >
            🎉 Gracias por tu compra, Carmen. ¿Repetimos la semana que viene?
          </BotBubble>

          {!activeActions.valorado && !activeActions.repetido && (
            <ReplyButtons 
              buttons={['Repetir', 'Valorar a Fali']} 
              onButtonClick={handleAction}
            />
          )}

          {activeActions.valorado && (
            <>
              <UserBubble timestamp="12:31">
                Valorar a Fali
              </UserBubble>
              <BotBubble puestoName="Asistente de Mercados" timestamp="12:31">
                ⭐ ¡Muchas gracias Carmen! Le hemos enviado tus 5 estrellas a Fali. Le va a hacer mucha ilusión leerlo.
              </BotBubble>
            </>
          )}

          {activeActions.repetido && (
            <>
              <UserBubble timestamp="12:31">
                Repetir
              </UserBubble>
              <BotBubble puestoName="Asistente de Mercados" timestamp="12:31">
                ¡Genial Carmen! ¿Quieres que preparemos la misma cesta (½ kg boquerones + 2 acedías limpias) para recogida mañana a las 10:00?
              </BotBubble>
              <div className="flex justify-end gap-1.5 px-3 my-1">
                <button className="px-3.5 py-1.5 bg-white border border-zinc-200 text-mercado-green text-xs font-semibold rounded-full cursor-not-allowed">
                  Sí, confirmar
                </button>
                <button className="px-3.5 py-1.5 bg-white border border-zinc-200 text-mercado-green text-xs font-semibold rounded-full cursor-not-allowed">
                  Cambiar algo
                </button>
              </div>
            </>
          )}
        </div>

        {/* Reset button */}
        <div className="mt-auto pt-4 flex justify-center select-none">
          <button 
            onClick={handleReset}
            className="text-[10px] bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-600 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
          >
            🔄 Reiniciar Simulación C07
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
};
