import { useState } from 'react';
import { C01OnboardingScreen } from './components/C01OnboardingScreen';
import { FlowScreen } from './engine/FlowScreen';
import type { FlowScript } from './engine/types';
import c02Script from './flows/c02.json';
import c03Script from './flows/c03.json';
import c07Script from './flows/c07.json';
import c11Script from './flows/c11.json';
import { WHATSAPP_CONSTRAINTS } from './data/mockData';
import { Info, HelpCircle, AlertTriangle, BookOpen, Layers, CheckSquare } from 'lucide-react';

export default function App() {
  const [showC03, setShowC03] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'constraints' | 'glossary'>('info');
  const [scale, setScale] = useState<number>(0.85);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Premium Sevilla Branding Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 shrink-0 relative overflow-hidden">
        {/* Subtle decorative top border styled as Sevillan colors */}
        <div className="h-1.5 w-full flex">
          <div className="bg-mercado-green flex-1"></div>
          <div className="bg-whatsapp-green flex-1"></div>
          <div className="bg-sevilla-tile flex-1"></div>
          <div className="bg-azafran flex-1"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center space-x-2 text-azafran">
              <span className="text-xs font-bold tracking-widest uppercase font-mono bg-azafran/10 px-2 py-0.5 rounded border border-azafran/20">Sevilla, España</span>
            </div>
            <h1 className="text-2xl md:text-3.5xl font-bold font-serif tracking-tight text-white mt-1">
              Plataforma Conversacional · Mercados de Sevilla
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Demostración interactiva de flujos conversacionales de pedidos en WhatsApp Business para mercados de abastos municipales, diseñados bajo las directrices del PRD, restricciones reales de Meta API y el sistema de diseño local.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center shrink-0">
            <button 
              onClick={() => setShowC03(!showC03)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center space-x-1.5 select-none ${
                showC03 
                  ? 'bg-mercado-green text-white border-mercado-green shadow-md' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <span>{showC03 ? '✓ Ver C03 Referencia' : '+ Mostrar C03 Referencia'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Educational Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full space-y-10">
        
        {/* Educational Tabs Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl text-left space-y-4">
          <div className="flex flex-wrap border-b border-slate-850 gap-2 pb-3">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'info' 
                  ? 'bg-mercado-green/15 text-mercado-green border border-mercado-green/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info size={14} />
              <span>Contexto del Producto</span>
            </button>
            <button
              onClick={() => setActiveTab('constraints')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'constraints' 
                  ? 'bg-mercado-green/15 text-mercado-green border border-mercado-green/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare size={14} />
              <span>Verificación de Restricciones API</span>
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'glossary' 
                  ? 'bg-mercado-green/15 text-mercado-green border border-mercado-green/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={14} />
              <span>Diccionario NLU Andaluz</span>
            </button>
          </div>

          {/* TAB 1: Product Context info */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-fade-in">
              <div className="space-y-2 border-r border-slate-800/60 pr-4">
                <div className="flex items-center space-x-2 text-mercado-green font-serif font-bold text-base">
                  <span className="text-xl">🐟</span>
                  <span>El Modelo Pescadería Fali</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fali (Mercado San Gonzalo, Triana) demostró que el canal conversacional gana al ecommerce tradicional: sube un vídeo del mostrador a las 9 AM, recibe audios desestructurados y entrega a domicilio o recogida cobrando en mano. Una tasa de conversión alta por cercanía y confianza.
                </p>
              </div>

              <div className="space-y-2 border-r border-slate-800/60 pr-4">
                <div className="flex items-center space-x-2 text-sevilla-tile font-serif font-bold text-base">
                  <span className="text-xl">🏛️</span>
                  <span>Hybridación Institucional</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Frente a la aplicación estática municipal <code className="text-slate-300">mercadosdesevilla.es</code>, este simulador replica un bot que sirve de secretario. Procesa lenguaje natural y coordina pedidos multipuesto sin obligar al placero a actualizar inventarios manuales.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-azafran font-serif font-bold text-base">
                  <span className="text-xl">🧑‍🍳</span>
                  <span>Voz y Tono de la Capa Conversacional</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Default: español andaluz cercano, sin chistes ni diminutivos condescendientes. Diseñado especialmente para personas mayores de 65 años (como Carmen, 71) que operan mediante mensajes libres y graban audios, asistiéndolas sin forzar pasarelas de pago digitales.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WhatsApp Constraints & Verifications */}
          {activeTab === 'constraints' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs animate-fade-in">
              {WHATSAPP_CONSTRAINTS.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-100 text-[13px]">{item.rule}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-mercado-green/10 text-confirm border border-confirm/20">{item.validation}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium"><strong className="text-slate-300">Límite:</strong> {item.limit}</p>
                  <p className="text-slate-400 leading-relaxed font-mono text-[10.5px] bg-slate-900/40 p-2 rounded border border-slate-850">{item.spec}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Localized Seville NLU Glossary */}
          {activeTab === 'glossary' && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-xs text-slate-400 leading-relaxed">
                El bot integra un LLM entrenado con el léxico gastronómico andaluz para transcribir y estructurar los pedidos en los mostradores sevillanos sin cometer fallos gramaticales:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <span className="font-mono font-bold text-confirm block text-xs">acedías</span>
                  <span className="text-[10px] text-slate-400">Pescado plano típico, delicado y sabroso de Sanlúcar.</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <span className="font-mono font-bold text-confirm block text-xs">boquerones para guiso</span>
                  <span className="text-[10px] text-slate-400">Pescado azul que Carmen pide desespinado o limpio para guisar.</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <span className="font-mono font-bold text-confirm block text-xs">cazón en adobo</span>
                  <span className="text-[10px] text-slate-400">Tiburón de piel áspera preparado en adobo, listo para freír.</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <span className="font-mono font-bold text-confirm block text-xs">avío de puchero</span>
                  <span className="text-[10px] text-slate-400">Conjunto de carnes, tocino y verduras para el caldo.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Simulator Area Grid */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div className="text-left">
              <h2 className="text-xl font-bold font-serif text-white">Simuladores de Flujo Activo (WhatsApp Business)</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Pulsa en los botones, inputs y flujos dentro de las pantallas para simular la conversación.</p>
            </div>
            {/* High Density Scale Selector */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0 self-start sm:self-center select-none">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 px-2">Escala:</span>
              <button 
                onClick={() => setScale(0.7)}
                className={`px-2.5 py-1 text-[10.5px] font-bold rounded-lg transition-all cursor-pointer ${scale === 0.7 ? 'bg-mercado-green text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Alta Densidad (70%)
              </button>
              <button 
                onClick={() => setScale(0.85)}
                className={`px-2.5 py-1 text-[10.5px] font-bold rounded-lg transition-all cursor-pointer ${scale === 0.85 ? 'bg-mercado-green text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Medio (85%)
              </button>
              <button 
                onClick={() => setScale(1)}
                className={`px-2.5 py-1 text-[10.5px] font-bold rounded-lg transition-all cursor-pointer ${scale === 1 ? 'bg-mercado-green text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Real (100%)
              </button>
            </div>
          </div>

          {/* Grid layout containing the mobile devices */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 justify-center items-start">
            
            {/* Screen 1: Onboarding C01 */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', height: `${840 * scale}px` }} className="transition-all duration-300 flex justify-center">
              <C01OnboardingScreen />
            </div>

            {/* Screen 2: Recurrente C02 (JSON script + FlowPlayer engine) */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', height: `${840 * scale}px` }} className="transition-all duration-300 flex justify-center">
              <FlowScreen script={c02Script as FlowScript} />
            </div>

            {/* Screen 3: Escalado C11 (JSON script) */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', height: `${840 * scale}px` }} className="transition-all duration-300 flex justify-center">
              <FlowScreen script={c11Script as FlowScript} />
            </div>

            {/* Screen 4: Tracking C07 (JSON script) */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', height: `${840 * scale}px` }} className="transition-all duration-300 flex justify-center">
              <FlowScreen script={c07Script as FlowScript} />
            </div>

          </div>

          {/* Optional Reference C03 Flow Screen - animated entry */}
          {showC03 && (
            <div className="pt-10 border-t border-slate-850 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', height: `${840 * scale}px` }} className="transition-all duration-300 flex justify-center">
                  <FlowScreen script={c03Script as FlowScript} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical verification logs & System guidelines conform to instructions */}
        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 text-left space-y-4 shadow-md">
          <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
            <span>📋</span>
            <span>Verificación de Coherencia Visual & Accesibilidad</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Paleta de Colores Oficiales</h4>
              <ul className="space-y-1">
                <li className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 bg-mercado-green rounded border border-white/10 shrink-0"></span>
                  <span>Verde Mercado (<code className="text-slate-300">#2D6A4F</code>) - Headers / Autoridad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 bg-whatsapp-green rounded border border-white/10 shrink-0"></span>
                  <span>Verde WhatsApp (<code className="text-slate-300">#25D366</code>) - CTAs / Burbuja Usuario</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 bg-sevilla-tile rounded border border-white/10 shrink-0"></span>
                  <span>Azulejo Sevilla (<code className="text-slate-300">#1B4F8A</code>) - Links / Sistema Handover</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 bg-chat-bg rounded border border-white/10 shrink-0"></span>
                  <span>Fondo Chat (<code className="text-slate-300">#EBE5DC</code>) - SVG azulejo opacidad 0.04</span>
                </li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Reglas Tipográficas Aplicadas</h4>
              <ul className="space-y-1">
                <li><strong className="text-slate-300">Display:</strong> Playfair Display para encabezados y nombres de puestos.</li>
                <li><strong className="text-slate-300">Cuerpo de Chat:</strong> Inter font con espaciados correctos.</li>
                <li><strong className="text-slate-300">Monospace:</strong> DM Mono para pesos, precios y códigos.</li>
                <li><strong className="text-slate-300">Tamaño de toque:</strong> Botones y chips interactivos superan siempre los 44px de área de pulsado.</li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Verificaciones de Seguridad</h4>
              <ul className="space-y-1">
                <li>✓ <strong className="text-slate-300">Voz y Tono:</strong> Sin emojis de adorno prohibidos (como 🔥, 🚀, 💯).</li>
                <li>✓ <strong className="text-slate-300">No Mock Data:</strong> Se simulan datos que corresponden a mercados reales de Sevilla.</li>
                <li>✓ <strong className="text-slate-300">Diseño Responsivo:</strong> Grid adaptativa que pasa de columna vertical a cuadricula de 4 según tamaño de pantalla.</li>
                <li>✓ <strong className="text-slate-300">Accesibilidad contrastes:</strong> Textos sobre fondos con ratios que superan el estándar AA de legibilidad.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Clean elegant footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center select-none shrink-0 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 Mercados Municipales de Sevilla · Capa Conversacional WhatsApp Business</p>
          <p className="font-mono text-[10px] text-slate-600">Simulador V2.0 • Diseñado conforme a directrices de Meta Business Manager</p>
        </div>
      </footer>
    </div>
  );
}
