import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { PhoneFrame } from './PhoneFrame';
import { BotBubble, DateSeparator, FlowCTAButton, SystemPill, UserBubble } from './ChatBubbles';
import { WhatsAppFlowModal } from './WhatsAppFlowModal';

export const C01OnboardingScreen: React.FC = () => {
  const [flowState, setFlowState] = useState<{
    isOpen: boolean;
    data: OnboardingData | null;
    isFinished: boolean;
    showMarketMessage: boolean;
  }>({
    isOpen: false,
    data: null,
    isFinished: false,
    showMarketMessage: false
  });

  const handleFlowSubmit = (data: OnboardingData) => {
    setFlowState({
      isOpen: false,
      data,
      isFinished: true,
      showMarketMessage: false
    });
  };

  const handleChipClick = () => {
    setFlowState(prev => ({
      ...prev,
      showMarketMessage: true
    }));
  };

  const handleReset = () => {
    setFlowState({
      isOpen: false,
      data: null,
      isFinished: false,
      showMarketMessage: false
    });
  };

  return (
    <div className="relative">
      <PhoneFrame
        id="phone-c01"
        title="Mercados de Sevilla"
        subtitle="Asistente oficial • En línea"
        avatarIcon="ph ph-storefront"
        avatarBg="bg-mercado-green"
        flowLabel="C01 Onboarding"
        flowDescription="Primer contacto y alta con WhatsApp Flow"
      >
        {/* Chat contents */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div className="space-y-1">
            <DateSeparator text="HOY" />
            
            <BotBubble 
              puestoName="Asistente de Mercados"
              timestamp="09:00"
            >
              Hola 👋 Soy el bot de Mercados de Sevilla. Te ayudo a comprar en los puestos del mercado sin moverte de casa.
            </BotBubble>

            <BotBubble 
              puestoName="Asistente de Mercados"
              timestamp="09:00"
              hasTail={false}
            >
              Cuéntame quién eres en 30 segundos para configurar tu cuenta de reparto y puestos favoritos.
            </BotBubble>

            {!flowState.isFinished && (
              <FlowCTAButton 
                label="Empezar" 
                onClick={() => setFlowState(prev => ({ ...prev, isOpen: true }))} 
              />
            )}

            {/* If flow is finished, simulate the user submitting and the bot replying */}
            {flowState.isFinished && flowState.data && (
              <>
                <UserBubble timestamp="09:01">
                  {`📋 Registro completado: ${flowState.data.nombre}, CP: ${flowState.data.cp}`}
                </UserBubble>

                <SystemPill 
                  type="blue"
                  text={`— Alta completada: ${flowState.data.nombre} en ${flowState.data.mercadoFav} —`} 
                />

                <BotBubble 
                  puestoName="Asistente de Mercados"
                  timestamp="09:02"
                >
                  {`Listo ${flowState.data.nombre}. Mañana a las 9:00 te enseño lo que Fali tenga en el mostrador.`}
                </BotBubble>

                {!flowState.showMarketMessage && (
                  <div className="flex justify-end px-3 my-2">
                    <button 
                      onClick={handleChipClick}
                      className="px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-mercado-green text-[12.5px] font-semibold rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      Ver mercado ahora
                    </button>
                  </div>
                )}

                {flowState.showMarketMessage && (
                  <>
                    <UserBubble timestamp="09:02">
                      Ver mercado ahora
                    </UserBubble>
                    
                    <BotBubble 
                      puestoName="Asistente de Mercados"
                      timestamp="09:03"
                    >
                      {`🏪 Mercados abiertos en tu zona hoy:\n\n• *Mercado San Gonzalo* 🟢 (Tu favorito)\n• *Mercado de Triana* 🟢\n• *Mercado de la Feria* 🟢\n\n¿Quieres que le echemos un vistazo a los puestos disponibles en San Gonzalo?`}
                    </BotBubble>
                    
                    <div className="flex justify-end gap-1.5 px-3 my-2">
                      <button className="px-4 py-2 bg-white border border-zinc-200 text-mercado-green text-[12.5px] font-semibold rounded-full shadow-sm cursor-not-allowed opacity-60">
                        Sí, ver puestos
                      </button>
                      <button className="px-4 py-2 bg-white border border-zinc-200 text-mercado-green text-[12.5px] font-semibold rounded-full shadow-sm cursor-not-allowed opacity-60">
                        Otro mercado
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Reset simulation helper inside the chat frame */}
          <div className="mt-auto pt-4 flex justify-center">
            <button 
              onClick={handleReset}
              className="text-[10px] bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-600 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
            >
              🔄 Reiniciar Simulación C01
            </button>
          </div>
        </div>

        {/* The overlay flow modal */}
        <WhatsAppFlowModal 
          isOpen={flowState.isOpen}
          onClose={() => setFlowState(prev => ({ ...prev, isOpen: false }))}
          onSubmit={handleFlowSubmit}
        />
      </PhoneFrame>
    </div>
  );
};
