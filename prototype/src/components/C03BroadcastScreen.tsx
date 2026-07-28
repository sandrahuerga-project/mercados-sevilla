import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { BotBubble, DateSeparator, ReplyButtons, SystemPill, TypingBubble, UserBubble } from './ChatBubbles';
import { Play } from 'lucide-react';

export const C03BroadcastScreen: React.FC = () => {
  const [step, setStep] = useState<'broadcast' | 'started' | 'typing' | 'structured' | 'confirmed'>('broadcast');

  const handleAction = (label: string) => {
    if (label === '🛒 Pedir') {
      setStep('started');
    } else if (label === '✓ Está bien') {
      setStep('confirmed');
    } else if (label === 'Cambiar algo') {
      setStep('started');
    }
  };

  const handleSimulateType = () => {
    setStep('typing');
    setTimeout(() => {
      setStep('structured');
    }, 1200);
  };

  const handleReset = () => {
    setStep('broadcast');
  };

  return (
    <PhoneFrame
      id="phone-c03"
      title="Pescadería Fali"
      subtitle="Asistente oficial • En línea"
      avatarIcon="ph ph-fish"
      avatarBg="bg-mercado-green"
      flowLabel="C03 Pedido Broadcast"
      flowDescription="Flujo de pedido desde vídeo diario (Referencia)"
    >
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1 text-left">
          <DateSeparator text="9:02 AM - BROADCAST" />

          {/* Broadcast Card */}
          {step === 'broadcast' && (
            <div className="flex flex-col items-start my-1.5 px-3 animate-fade-in">
              <span className="text-[11px] font-semibold text-mercado-green mb-0.5 ml-2">
                Pescadería Fali
              </span>
              <div className="relative max-w-[82%] bg-white rounded-2xl rounded-tl-none bubble-tail-bot shadow-bubble overflow-hidden border border-zinc-200">
                {/* 16:9 Video Thumbnail */}
                <div className="relative aspect-video w-full bg-slate-800 flex items-center justify-center text-white overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-65"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-mercado-green shadow-lg z-10 cursor-pointer">
                    <Play size={18} className="fill-current ml-0.5" />
                  </div>
                  <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-mono text-white select-none">
                    0:38
                  </span>
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-azafran text-white text-[9px] font-bold rounded-full select-none flex items-center space-x-1">
                    <span>●</span>
                    <span>VÍDEO DE HOY</span>
                  </span>
                </div>

                {/* Text content */}
                <div className="p-3 text-[13px] text-zinc-700 leading-relaxed border-t border-zinc-100">
                  <p className="font-serif font-bold text-zinc-900 text-[14px] mb-1">¡Buenos días, Carmen! 👋</p>
                  <p>Hoy en el mostrador: acedías fresquísimas de Sanlúcar, boquerones de primera y gamba blanca de Huelva.</p>
                  <p className="mt-1.5 text-xs text-zinc-400 font-medium">🛒 Pide hoy antes de las 12:30 para reparto o recogida.</p>
                </div>
                
                {/* Timestamp */}
                <div className="text-right px-3 pb-2 select-none">
                  <span className="text-[9.5px] text-zinc-400 font-mono">09:02</span>
                </div>
              </div>
            </div>
          )}

          {step === 'broadcast' && (
            <ReplyButtons 
              buttons={['🛒 Pedir', 'Lo de siempre', 'Ver el vídeo']} 
              onButtonClick={handleAction}
            />
          )}

          {/* Triggered order initiation */}
          {step !== 'broadcast' && (
            <>
              <UserBubble timestamp="09:02">
                🛒 Pedir
              </UserBubble>

              <BotBubble puestoName="Pescadería Fali Asistente" timestamp="09:03">
                {`Hola Carmen 👋\n¿Qué quieres hoy de *Pescadería Fali*?\n\nEscríbelo como tú quieras: el peso o número, y cualquier preferencia (limpias, para guiso, sin cabeza, lo que sea). Puedes mandar audio también.`}
              </BotBubble>
            </>
          )}

          {step === 'started' && (
            <div className="flex flex-col items-center p-3 space-y-2 bg-zinc-100/50 rounded-xl border border-zinc-200/50 mx-3 mt-4">
              <p className="text-[11px] text-zinc-500 text-center font-medium leading-relaxed">
                Simula el pedido de Carmen: "Quiero medio kilo de boquerones para guiso y dos acedías limpias por favor."
              </p>
              <button 
                onClick={handleSimulateType}
                className="px-4 py-2 bg-mercado-green hover:bg-mercado-green/95 text-white text-xs font-bold rounded-full shadow-sm cursor-pointer select-none transition-all active:scale-95"
              >
                🎙️ Enviar Mensaje de Carmen
              </button>
            </div>
          )}

          {step === 'typing' && (
            <>
              <UserBubble timestamp="09:04">
                Quiero medio kilo de boquerones para guiso y dos acedías limpias por favor.
              </UserBubble>
              <TypingBubble />
            </>
          )}

          {step === 'structured' && (
            <>
              <UserBubble timestamp="09:04">
                Quiero medio kilo de boquerones para guiso y dos acedías limpias por favor.
              </UserBubble>

              {/* Bot structured order representation */}
              <div className="flex flex-col items-start my-1.5 px-3 relative animate-fade-in text-left">
                <span className="text-[11px] font-semibold text-mercado-green mb-0.5 ml-2">
                  Pescadería Fali Asistente
                </span>
                
                {/* Visual order card styled as a clean white bubble */}
                <div className="relative max-w-[85%] bg-white text-zinc-800 text-[13.5px] leading-relaxed shadow-bubble rounded-2xl rounded-tl-none bubble-tail-bot border border-zinc-100 p-3">
                  <p className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-mercado-green mb-2 select-none flex items-center space-x-1">
                    <span>📝</span>
                    <span>Pedido Entendido</span>
                  </p>
                  
                  <div className="space-y-1 border-t border-zinc-100 pt-2 mb-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-700">½ kg Boquerones</span>
                      <span className="text-zinc-400 text-xs italic font-mono">para guiso</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-700">2 acedías limpias</span>
                      <span className="text-zinc-400 text-xs italic font-mono">limpias</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-zinc-500 italic mt-2.5 leading-relaxed bg-zinc-50 border border-zinc-200/50 rounded p-1.5 select-none">
                    Fali te confirma el precio exacto cuando pese el pescado y prepare lo tuyo.
                  </p>
                  
                  <div className="text-right mt-1.5 select-none">
                    <span className="text-[9.5px] text-zinc-400 font-mono">09:04</span>
                  </div>
                </div>
              </div>

              {/* Grey disclaimer text before button selection, strictly following instructions */}
              <div className="px-5 my-1.5 text-left">
                <p className="text-[10px] text-zinc-400 leading-normal">
                  ⚠️ <em>Al confirmar, Fali empieza a prepararlo. No se puede cancelar después.</em>
                </p>
              </div>

              <ReplyButtons 
                buttons={['✓ Está bien', 'Cambiar algo', 'Hablar c/Fali']}
                onButtonClick={handleAction}
              />
            </>
          )}

          {step === 'confirmed' && (
            <>
              <UserBubble timestamp="09:04">
                Quiero medio kilo de boquerones para guiso y dos acedías limpias por favor.
              </UserBubble>
              
              <div className="flex flex-col items-start my-1.5 px-3 relative text-left">
                <span className="text-[11px] font-semibold text-mercado-green mb-0.5 ml-2">
                  Pescadería Fali Asistente
                </span>
                <div className="relative max-w-[85%] bg-white text-zinc-800 text-[13.5px] leading-relaxed shadow-bubble rounded-2xl rounded-tl-none bubble-tail-bot p-3">
                  <p className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-mercado-green mb-1 select-none">📝 Pedido Entendido</p>
                  <div className="space-y-1 border-t border-zinc-100 pt-1.5 text-zinc-400">
                    <div className="flex justify-between">
                      <span>½ kg Boquerones</span>
                      <span className="text-xs italic font-mono">para guiso</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 acedías limpias</span>
                      <span className="text-xs italic font-mono">limpias</span>
                    </div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-[9.5px] text-zinc-400 font-mono">09:04</span>
                  </div>
                </div>
              </div>

              <UserBubble timestamp="09:04">
                ✓ Está bien
              </UserBubble>

              <BotBubble puestoName="Pescadería Fali Asistente" timestamp="09:05">
                {`¡Apuntado Carmen! Fali ha recibido tu solicitud en su panel.\n\nTe llegará una notificación de confirmación en breve en cuanto acepte el pedido. Puedes seguir agregando de otros puestos de San Gonzalo si lo deseas.`}
              </BotBubble>

              <SystemPill 
                type="blue" 
                text="— Transición a S02: Espera de Aceptación —" 
              />
            </>
          )}
        </div>

        {/* Reset / helper section */}
        <div className="mt-auto pt-4 flex justify-center select-none">
          <button 
            onClick={handleReset}
            className="text-[10px] bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-600 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer"
          >
            🔄 Reiniciar Simulación C03
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
};
