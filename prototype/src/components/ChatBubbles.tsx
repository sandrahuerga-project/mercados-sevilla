import React from 'react';
import { Play, CheckCheck } from 'lucide-react';

// Date separator
export const DateSeparator: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-center my-4 select-none">
      <div className="bg-[#D1E4FC] text-[#1B4F8A] text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-md shadow-sm">
        {text}
      </div>
    </div>
  );
};

// Centered System Pill (e.g. Handover, information)
export const SystemPill: React.FC<{ text: string; type?: 'default' | 'blue' | 'yellow' }> = ({ text, type = 'default' }) => {
  let bgClass = "bg-white text-zinc-500 border-zinc-200";
  if (type === 'blue') {
    bgClass = "bg-bubble-system text-sevilla-tile border-[#D4E8FC]";
  } else if (type === 'yellow') {
    bgClass = "bg-[#FFF9ED] text-[#A76F1D] border-[#FBECC6]";
  }

  return (
    <div className="flex justify-center my-2.5 px-4 select-none">
      <div className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full text-center border shadow-sm max-w-[90%] leading-relaxed ${bgClass}`}>
        {text}
      </div>
    </div>
  );
};

// Bot Bubble
interface BotBubbleProps {
  text?: React.ReactNode;
  timestamp: string;
  avatarIcon?: string;
  puestoName?: string;
  hasTail?: boolean;
  children?: React.ReactNode;
  warning?: boolean;
}

export const BotBubble: React.FC<BotBubbleProps> = ({
  text,
  timestamp,
  puestoName,
  hasTail = true,
  children,
  warning = false
}) => {
  return (
    <div className="flex flex-col items-start my-1.5 px-3 relative animate-fade-in">
      {puestoName && (
        <span className="text-[11px] font-semibold text-mercado-green mb-0.5 ml-2">
          {puestoName}
        </span>
      )}
      
      <div className={`relative max-w-[82%] px-3 py-2 bg-white text-zinc-800 text-[13.5px] leading-relaxed shadow-bubble rounded-2xl ${
        hasTail ? 'rounded-tl-none bubble-tail-bot' : ''
      } ${warning ? 'border-l-4 border-azafran bg-[#FFFBF4]' : ''}`}>
        {text && <div className="whitespace-pre-wrap">{text}</div>}
        {children}
        
        <div className="text-right mt-1 select-none flex items-center justify-end space-x-1">
          <span className="text-[9.5px] text-zinc-400 font-mono">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

// User Bubble
interface UserBubbleProps {
  text?: string;
  timestamp: string;
  hasTail?: boolean;
  children?: React.ReactNode;
}

export const UserBubble: React.FC<UserBubbleProps> = ({
  text,
  timestamp,
  hasTail = true,
  children
}) => {
  return (
    <div className="flex flex-col items-end my-1.5 px-3 relative animate-fade-in">
      <div className={`relative max-w-[82%] px-3 py-2 bg-[#DCF8C6] text-zinc-800 text-[13.5px] leading-relaxed shadow-bubble rounded-2xl ${
        hasTail ? 'rounded-tr-none bubble-tail-user' : ''
      }`}>
        {text && <div className="whitespace-pre-wrap">{text}</div>}
        {children}
        
        <div className="text-right mt-1 select-none flex items-center justify-end space-x-1">
          <span className="text-[9.5px] text-zinc-500/80 font-mono">{timestamp}</span>
          <CheckCheck size={13} className="text-[#53BDEB] inline" />
        </div>
      </div>
    </div>
  );
};

// Simulated Audio Voice Note Bubble
export const AudioBubble: React.FC<{ sender: 'bot' | 'user'; duration: string; timestamp: string }> = ({
  sender,
  duration,
  timestamp
}) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-1.5 px-3`}>
      <div className={`relative w-[240px] px-3.5 py-2.5 shadow-bubble rounded-2xl flex items-center space-x-3 ${
        isUser ? 'bg-[#DCF8C6] rounded-tr-none bubble-tail-user' : 'bg-white rounded-tl-none bubble-tail-bot'
      }`}>
        {/* Play Button */}
        <button className="w-8 h-8 rounded-full bg-mercado-green/10 flex items-center justify-center text-mercado-green hover:bg-mercado-green/20 transition-colors cursor-pointer shrink-0">
          <Play size={14} className="fill-current ml-0.5" />
        </button>

        {/* Audio Waveform Simulator */}
        <div className="flex-1 flex items-end space-x-[2px] h-6 pb-1">
          {[3, 5, 2, 7, 4, 8, 3, 6, 4, 9, 5, 3, 7, 4, 8, 2, 6, 5, 3, 7, 2, 5, 8, 3, 4, 6].map((h, i) => (
            <div 
              key={i} 
              className={`w-[2px] rounded-full ${isUser ? 'bg-zinc-600' : 'bg-zinc-400'}`} 
              style={{ height: `${h * 2.2 + 2}px` }}
            />
          ))}
        </div>

        {/* Duration and timestamp */}
        <div className="flex flex-col items-end shrink-0 text-right select-none">
          <span className="text-[10px] font-semibold text-zinc-500 font-mono">{duration}</span>
          <div className="flex items-center space-x-0.5 mt-1">
            <span className="text-[8.5px] text-zinc-400 font-mono">{timestamp}</span>
            {isUser && <CheckCheck size={11} className="text-[#53BDEB]" />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated WhatsApp Typing Bubble
export const TypingBubble: React.FC = () => {
  return (
    <div className="flex flex-col items-start my-1.5 px-3 animate-pulse">
      <div className="relative px-4 py-3 bg-white text-zinc-500 rounded-2xl rounded-tl-none bubble-tail-bot shadow-bubble flex items-center space-x-1">
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot animate-typing-dot-1"></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot animate-typing-dot-2"></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot animate-typing-dot-3"></div>
      </div>
    </div>
  );
};

// Interactive Reply Button Set (strictly max 3 buttons, max 20 chars per button, conforming to WhatsApp rules)
interface ReplyButtonsProps {
  buttons: string[];
  onButtonClick: (label: string) => void;
  disabled?: boolean;
}

export const ReplyButtons: React.FC<ReplyButtonsProps> = ({
  buttons,
  onButtonClick,
  disabled = false
}) => {
  // Respecting WA rules: max 3 buttons, limit array to 3 items
  const validButtons = buttons.slice(0, 3);
  
  return (
    <div className="flex flex-wrap justify-end gap-1.5 px-3 my-2 select-none">
      {validButtons.map((btnLabel, idx) => {
        // Enforce the WhatsApp limit: max 20 characters per button
        const truncatedLabel = btnLabel.length > 20 ? btnLabel.substring(0, 19) + '…' : btnLabel;
        const isExceeded = btnLabel.length > 20;

        return (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => onButtonClick(btnLabel)}
            title={isExceeded ? `Original: "${btnLabel}" (Excede límite WA de 20 chars!)` : undefined}
            className={`px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-mercado-green hover:text-mercado-green/90 text-[12.5px] font-semibold rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer max-w-full text-center truncate ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {truncatedLabel}
          </button>
        );
      })}
    </div>
  );
};

// WhatsApp Flow CTA Button (Triggers full screen Flow modal)
export const FlowCTAButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    <div className="flex justify-center px-4 my-2">
      <button 
        onClick={onClick}
        className="w-full max-w-[260px] py-2.5 bg-whatsapp-green hover:bg-whatsapp-green/95 text-white text-[13px] font-bold rounded-full shadow-md flex items-center justify-center space-x-1.5 cursor-pointer transform hover:scale-[1.01] transition-transform select-none"
      >
        <span>⚡</span>
        <span>{label}</span>
      </button>
    </div>
  );
};
