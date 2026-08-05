import React from 'react';
import { Camera, Mic, MoreVertical, ChevronLeft, Send } from 'lucide-react';
import { PersonaImage, type PersonaId } from '../shell/PersonaImage';

interface PhoneFrameProps {
  id: string;
  title: string;
  subtitle?: string;
  /** Personaje cuya ilustración hace de foto de perfil del negocio. */
  persona?: PersonaId;
  avatarBg?: string; // Tailwind class
  children: React.ReactNode;
  /**
   * Nombre y descripción del flujo. Ya no se pintan encima del móvil: quien
   * abre una tarjeta acaba de leerlos en la propia tarjeta, y repetirlos dos
   * centímetros más abajo sobraba. Se conservan para nombrar el móvil a quien
   * navega con lector de pantalla, que sí llega aquí sin ese contexto.
   */
  flowLabel: string;
  flowDescription: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSendClick?: () => void;
  showSendButton?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  id,
  title,
  subtitle = "En línea",
  persona = "mercado",
  avatarBg = "bg-mercado-green",
  children,
  flowLabel,
  flowDescription,
  inputValue = "",
  onInputChange,
  onInputKeyPress,
  onSendClick,
  showSendButton = false
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Simulated Device Frame */}
      <div
        id={id}
        role="group"
        aria-label={`${flowLabel}. ${flowDescription}`}
        className="relative w-[375px] h-[812px] bg-slate-950 rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-[#222] flex flex-col select-none text-slate-900 transition-all duration-300"
      >
        {/* Device Top Speaker and Notch/Island */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
          <div className="w-10 h-1 bg-zinc-900 rounded-full"></div>
          <div className="w-3 h-1 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Status Bar Indicators */}
        <div className="h-10 bg-mercado-green text-white text-[11px] font-semibold px-6 pt-5 flex justify-between items-center z-40 select-none">
          <span>09:00</span>
          <div className="flex items-center space-x-1.5">
            {/* signal */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M2 22h20V2z" opacity="0.3" />
              <path d="M17 7L2 22h15z" />
            </svg>
            {/* wifi */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21l-12-12c4.4-4.4 11.6-4.4 16 0z" />
            </svg>
            {/* battery */}
            <div className="w-5 h-2.5 border border-white/60 rounded-sm p-0.5 flex items-center">
              <div className="bg-white h-full w-[85%] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* WhatsApp Fixed Header (56px) */}
        <div className="h-14 bg-mercado-green text-white px-3 flex items-center justify-between shadow-md z-40">
          <div className="flex items-center space-x-1.5">
            <button className="p-0.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white">
              <ChevronLeft size={20} />
            </button>
            <div className={`w-9 h-9 ${avatarBg} rounded-full shadow-sm border border-white/20 overflow-hidden relative`}>
              <PersonaImage id={persona} className="w-full h-full text-lg" />
              {/* Active dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-confirm rounded-full border border-mercado-green"></span>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <h4 className="text-sm font-semibold tracking-tight">{title}</h4>
              <span className="text-[10px] text-white/80 font-medium">{subtitle}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Chat Area with Seville Azulejo Tile Background.
            `data-fondo` para el puntero: la pantalla es clara aunque el móvil
            esté sobre la sección verde oscura. La cabecera del chat no se
            marca: esa sí es verde, y ahí el puntero claro va bien. */}
        <div
          data-fondo="claro"
          className="flex-1 chat-container-bg flex flex-col relative overflow-y-auto whatsapp-scrollbar"
        >
          {children}
        </div>

        {/* WhatsApp Fixed Bottom Input Bar (52px) */}
        <div
          data-fondo="claro"
          className="h-[52px] bg-[#F0F2F5] border-t border-zinc-200 px-2.5 flex items-center justify-between space-x-2 z-40"
        >
          <div className="flex-1 bg-white h-9 rounded-full px-3 flex items-center border border-zinc-200/80 shadow-sm">
            <span className="text-xl mr-2 cursor-pointer select-none opacity-70 hover:opacity-100">😊</span>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={inputValue}
              readOnly={!onInputChange}
              onChange={onInputChange}
              onKeyDown={onInputKeyPress}
              className="flex-1 text-[13px] bg-transparent outline-none text-zinc-800 placeholder-zinc-400 h-full"
            />
            <div className="flex items-center space-x-2 text-zinc-400">
              <button className="hover:text-zinc-600 transition-colors">
                <Camera size={18} />
              </button>
            </div>
          </div>
          <div className="w-9 h-9 bg-mercado-green text-white rounded-full flex items-center justify-center shadow hover:opacity-95 transition-opacity cursor-pointer">
            {showSendButton && inputValue.trim().length > 0 ? (
              <button onClick={onSendClick} className="text-white">
                <Send size={16} className="ml-[1px]" />
              </button>
            ) : (
              <Mic size={18} />
            )}
          </div>
        </div>

        {/* Home indicator bar (iPhone virtual button) */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-zinc-400 rounded-full z-50"></div>
      </div>
    </div>
  );
};
