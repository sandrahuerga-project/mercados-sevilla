import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { MERCADOS, PUESTOS_SAN_GONZALO } from '../data/mockData';
import { ArrowLeft, Check } from 'lucide-react';

interface WhatsAppFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OnboardingData) => void;
}

export const WhatsAppFlowModal: React.FC<WhatsAppFlowModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [nombre, setNombre] = useState('Carmen');
  const [cp, setCp] = useState('41010'); // Triana postal code
  const [mercadoFav, setMercadoFav] = useState('san-gonzalo');
  const [puestosInteres, setPuestosInteres] = useState<string[]>(['fali', 'manolo']);
  const [recibirVideo, setRecibirVideo] = useState(true);

  // Error messages
  const [errors, setErrors] = useState<{ nombre?: string; cp?: string }>({});

  const handleNextFromP1 = () => {
    const newErrors: { nombre?: string; cp?: string } = {};
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!cp.trim() || cp.length !== 5 || isNaN(Number(cp))) {
      newErrors.cp = 'Debe ser un código postal válido de 5 dígitos';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setCurrentScreen(2);
    }
  };

  const handleNextFromP2 = () => {
    setCurrentScreen(3);
  };

  const handleBack = () => {
    if (currentScreen === 2) setCurrentScreen(1);
    if (currentScreen === 3) setCurrentScreen(2);
  };

  const handleFinish = () => {
    onSubmit({
      nombre,
      cp,
      mercadoFav: MERCADOS.find(m => m.id === mercadoFav)?.name || 'San Gonzalo',
      puestosInteres: puestosInteres.map(pId => PUESTOS_SAN_GONZALO.find(p => p.id === pId)?.name || pId),
      recibirVideo
    });
  };

  const togglePuesto = (id: string) => {
    if (puestosInteres.includes(id)) {
      setPuestosInteres(puestosInteres.filter(p => p !== id));
    } else {
      setPuestosInteres([...puestosInteres, id]);
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-slide-up select-none">
      {/* Flow Header */}
      <div className="h-14 bg-zinc-100 border-b border-zinc-200 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={currentScreen === 1 ? onClose : handleBack}
            className="p-1 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer text-zinc-600"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[12px] font-bold text-mercado-green uppercase tracking-wider">WhatsApp Flow</span>
            <span className="text-[14px] font-bold text-zinc-800">Mercados de Sevilla</span>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center space-x-1.5 bg-zinc-200/60 px-2.5 py-1 rounded-full">
          <span className={`w-2 h-2 rounded-full ${currentScreen === 1 ? 'bg-mercado-green' : 'bg-zinc-400'}`}></span>
          <span className={`w-2 h-2 rounded-full ${currentScreen === 2 ? 'bg-mercado-green' : 'bg-zinc-400'}`}></span>
          <span className={`w-2 h-2 rounded-full ${currentScreen === 3 ? 'bg-mercado-green' : 'bg-zinc-400'}`}></span>
        </div>
      </div>

      {/* Flow Body Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 text-left flex flex-col justify-between">
        <div>
          {/* SCREEN 1: Name and Postal Code */}
          {currentScreen === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-serif font-bold text-zinc-900 leading-tight">¿Quién eres?</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Para darte de alta y ofrecerte los puestos locales de tu zona, confírmanos tus datos en 30 segundos.
                </p>
              </div>

              {/* Input Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tu Nombre</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Carmen"
                  className={`w-full px-3 py-2.5 bg-zinc-50 border ${errors.nombre ? 'border-cancel' : 'border-zinc-300'} rounded-lg text-[13px] text-zinc-800 outline-none focus:ring-1 focus:ring-mercado-green`}
                />
                {errors.nombre && <p className="text-[10px] text-cancel font-medium">{errors.nombre}</p>}
              </div>

              {/* Input Postal Code */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Código Postal (Sevilla)</label>
                <input 
                  type="text" 
                  maxLength={5}
                  value={cp}
                  onChange={(e) => setCp(e.target.value)}
                  placeholder="Ej: 41010"
                  className={`w-full px-3 py-2.5 bg-zinc-50 border ${errors.cp ? 'border-cancel' : 'border-zinc-300'} rounded-lg text-[13px] text-zinc-800 outline-none focus:ring-1 focus:ring-mercado-green font-mono`}
                />
                {errors.cp && <p className="text-[10px] text-cancel font-medium">{errors.cp}</p>}
                <p className="text-[10px] text-zinc-400 mt-0.5">El reparto a domicilio cubre un radio de 3 km dentro de los CPs habilitados.</p>
              </div>
            </div>
          )}

          {/* SCREEN 2: Favorite Market & Interested Merchants */}
          {currentScreen === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-serif font-bold text-zinc-900 leading-tight">Mercados de Sevilla</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Escoge tu mercado de abastos más cercano y los puestos que deseas que te asistan.
                </p>
              </div>

              {/* Dropdown Mercado */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Mercado Favorito</label>
                <select 
                  value={mercadoFav}
                  onChange={(e) => setMercadoFav(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-[13px] text-zinc-800 outline-none focus:ring-1 focus:ring-mercado-green cursor-pointer"
                >
                  {MERCADOS.filter(m => m.active).map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox Group Puestos */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Puestos que te interesan</label>
                <div className="grid grid-cols-1 gap-2">
                  {PUESTOS_SAN_GONZALO.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => togglePuesto(p.id)}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                        puestosInteres.includes(p.id) 
                          ? 'border-mercado-green bg-mercado-green/5' 
                          : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl">{p.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-zinc-800 leading-tight">{p.name}</span>
                          <span className="text-[10px] text-zinc-400 font-medium">{p.category}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        puestosInteres.includes(p.id) 
                          ? 'bg-mercado-green border-mercado-green text-white' 
                          : 'border-zinc-300 bg-white'
                      }`}>
                        {puestosInteres.includes(p.id) && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: OptIn Video + Finish */}
          {currentScreen === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl font-serif font-bold text-zinc-900 leading-tight">Difusión y Privacidad</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  ¿Cómo te gustaría recibir la información diaria y novedades frescas?
                </p>
              </div>

              {/* Consent Card */}
              <div className="bg-[#E8F4FD]/60 border border-[#D4E8FC] rounded-xl p-4 space-y-3.5">
                <div className="flex items-start space-x-3 cursor-pointer" onClick={() => setRecibirVideo(!recibirVideo)}>
                  <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    recibirVideo ? 'bg-mercado-green border-mercado-green text-white' : 'border-zinc-300 bg-white'
                  }`}>
                    {recibirVideo && <Check size={12} strokeWidth={3} />}
                  </div>
                  <div className="flex-1 flex flex-col text-left">
                    <span className="text-[13px] font-bold text-zinc-800 leading-snug">Quiero recibir el vídeo diario de mis puestos</span>
                    <span className="text-[10.5px] text-zinc-500 leading-relaxed mt-0.5">
                      Fali y los demás placeros suben a las 9:00 AM el mostrador del día. Recibirás un breve mensaje en WhatsApp con lo que hay fresco.
                    </span>
                  </div>
                </div>
              </div>

              {/* GDPR Legal pill */}
              <div className="text-[10px] text-zinc-400 leading-relaxed bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                📋 <strong className="text-zinc-600">Reglamento General de Protección de Datos (RGPD):</strong> Guardaremos tu nombre y número para tramitar tus pedidos con los placeros de Sevilla. Tus datos están totalmente protegidos. Puedes darte de baja en cualquier momento enviando el mensaje <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800 font-mono">BAJA</code>.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 border-t border-zinc-100 pt-4 shrink-0">
          {currentScreen === 1 && (
            <button 
              onClick={handleNextFromP1}
              className="w-full py-3 bg-mercado-green hover:bg-mercado-green/95 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] text-center text-[13px] cursor-pointer"
            >
              Siguiente
            </button>
          )}

          {currentScreen === 2 && (
            <button 
              onClick={handleNextFromP2}
              className="w-full py-3 bg-mercado-green hover:bg-mercado-green/95 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] text-center text-[13px] cursor-pointer"
            >
              Continuar
            </button>
          )}

          {currentScreen === 3 && (
            <button 
              onClick={handleFinish}
              className="w-full py-3 bg-confirm hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] text-center text-[13px] cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Empezar a comprar</span>
            </button>
          )}

          <div className="text-center mt-3 select-none">
            <span className="text-[10px] text-zinc-400 font-medium">Lanzado de forma segura en WhatsApp Web</span>
          </div>
        </div>
      </div>
    </div>
  );
};
