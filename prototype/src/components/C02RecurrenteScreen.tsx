import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { BotBubble, DateSeparator, ReplyButtons, UserBubble } from './ChatBubbles';
import { Play } from 'lucide-react';

export const C02RecurrenteScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFaliVideo, setShowFaliVideo] = useState(false);

  const handleButtonClick = (label: string) => {
    setSelectedOption(label);
    if (label === 'Sí, ver hoy') {
      setTimeout(() => {
        setShowFaliVideo(true);
      }, 600);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowFaliVideo(false);
  };

  return (
    <PhoneFrame
      id="phone-c02"
      title="Mercado San Gonzalo"
      subtitle="Asistente oficial • En línea"
      avatarIcon="ph ph-storefront"
      avatarBg="bg-mercado-green"
      flowLabel="C02 Recurrente"
      flowDescription="Mensaje diario corto de activación recurrente"
    >
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1">
          <DateSeparator text="HOY" />

          {/* Bot's prompt message */}
          <BotBubble 
            puestoName="Mercado San Gonzalo"
            timestamp="09:00"
          >
            Buenos días Carmen 👋 ¿Compras hoy en San Gonzalo?
          </BotBubble>

          {/* Render reply buttons if no option is selected */}
          {!selectedOption && (
            <ReplyButtons 
              buttons={['Sí, ver hoy', 'Otro mercado', 'Ahora no']} 
              onButtonClick={handleButtonClick}
            />
          )}

          {/* If they select "Ahora no" */}
          {selectedOption === 'Ahora no' && (
            <>
              <UserBubble timestamp="09:00">
                Ahora no
              </UserBubble>
              <BotBubble puestoName="Mercado San Gonzalo" timestamp="09:01">
                ¡No te preocupes Carmen! Si cambias de opinión o necesitas algo más tarde, escríbeme aquí cuando quieras. ¡Que tengas un buen día! ☀️
              </BotBubble>
            </>
          )}

          {/* If they select "Otro mercado" */}
          {selectedOption === 'Otro mercado' && (
            <>
              <UserBubble timestamp="09:00">
                Otro mercado
              </UserBubble>
              <BotBubble puestoName="Mercado San Gonzalo" timestamp="09:01">
                Entendido Carmen. ¿Qué mercado de abastos prefieres consultar hoy?
              </BotBubble>
              <ReplyButtons 
                buttons={['Mercado de Triana', 'Mercado de la Feria']} 
                onButtonClick={() => {}}
                disabled={true}
              />
            </>
          )}

          {/* If they select "Sí, ver hoy" */}
          {selectedOption === 'Sí, ver hoy' && (
            <>
              <UserBubble timestamp="09:00">
                Sí, ver hoy
              </UserBubble>

              {showFaliVideo ? (
                <>
                  <BotBubble puestoName="Mercado San Gonzalo" timestamp="09:01">
                    Genial Carmen. Te dejo el vídeo diario que Fali ha grabado hace una hora en Pescadería Fali:
                  </BotBubble>

                  {/* Broadcast visual media card simulator */}
                  <div className="flex flex-col items-start my-1.5 px-3 animate-fade-in">
                    <span className="text-[11px] font-semibold text-mercado-green mb-0.5 ml-2">
                      Pescadería Fali
                    </span>
                    <div className="relative max-w-[82%] bg-white rounded-2xl rounded-tl-none bubble-tail-bot shadow-bubble overflow-hidden border border-zinc-200">
                      {/* Video Thumbnail Simulation */}
                      <div className="relative aspect-video w-full bg-slate-800 flex items-center justify-center text-white overflow-hidden group">
                        {/* Simulated photo representing Seville fish stall */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-65"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Play overlay button */}
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-mercado-green shadow-lg z-10 cursor-pointer transform group-hover:scale-105 transition-transform">
                          <Play size={18} className="fill-current ml-0.5" />
                        </div>
                        
                        {/* Duration label */}
                        <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-mono text-white select-none">
                          0:38
                        </span>
                        
                        {/* Video notification pill */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-azafran text-white text-[9px] font-bold rounded-full select-none flex items-center space-x-1">
                          <span>●</span>
                          <span>EN DIRECTO DESDE EL PUESTO</span>
                        </span>
                      </div>

                      {/* Description body */}
                      <div className="p-3 text-[13px] text-zinc-700 leading-relaxed text-left border-t border-zinc-100">
                        <p className="font-serif font-bold text-zinc-900 text-[14px] mb-1">¡Buenos días, Carmen! 👋</p>
                        <p>Hoy en el mostrador: acedías fresquísimas de Sanlúcar, boquerones de primera y gamba blanca de Huelva.</p>
                        <p className="mt-1.5 text-xs text-zinc-400 font-medium">🛒 Pide hoy antes de las 12:30 para reparto o recogida.</p>
                      </div>
                      
                      {/* Timestamp */}
                      <div className="text-right px-3 pb-2 select-none">
                        <span className="text-[9.5px] text-zinc-400 font-mono">09:01</span>
                      </div>
                    </div>
                  </div>

                  {/* Options under video */}
                  <div className="flex justify-end gap-1.5 px-3 my-2 select-none">
                    <button className="px-4 py-2 bg-whatsapp-green text-white text-[12.5px] font-semibold rounded-full shadow-sm cursor-not-allowed">
                      🛒 Pedir
                    </button>
                    <button className="px-4 py-2 bg-white text-mercado-green text-[12.5px] font-semibold rounded-full border border-zinc-200 shadow-sm cursor-not-allowed">
                      Ver otros puestos
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-start my-1.5 px-3 animate-pulse">
                  <div className="px-4 py-3 bg-white text-zinc-500 rounded-2xl rounded-tl-none bubble-tail-bot shadow-bubble flex items-center space-x-1">
                    <span className="text-xs">Fali preparando vídeo diario...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* WhatsApp user typing status ("Carmen escribiendo...") */}
        <div className="mt-auto flex flex-col items-center">
          {/* Typist pill inside chat */}
          {!selectedOption && (
            <div className="bg-[#E8F4FD] text-sevilla-tile text-[10.5px] font-semibold px-3 py-1 rounded-full shadow-sm mb-4 animate-pulse flex items-center space-x-1 border border-[#D4E8FC]">
              <span>💬</span>
              <span>Carmen está escribiendo en su móvil...</span>
            </div>
          )}

          {/* Reset button */}
          <button 
            onClick={handleReset}
            className="text-[10px] bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-600 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
          >
            🔄 Reiniciar Simulación C02
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
};
