import React, { useMemo, useState } from 'react';
import { INITIAL_ORDERS, STATE_COLOR, STATE_LABEL } from './orders';
import type { PanelOrder, PaymentMethod } from './types';

type Filter = 'todos' | PanelOrder['state'];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'nuevo', label: 'Nuevos' },
  { key: 'aceptado', label: 'Aceptados' },
  { key: 'preparando', label: 'Preparando' },
  { key: 'por-cobrar', label: 'Por cobrar' },
];

const PAYMENT_METHODS: PaymentMethod[] = ['Efectivo', 'Bizum', 'Tarjeta'];

// P03 — Gestión de pedidos. Each action is one tap; marking "Listo" asks for the
// final weighed total, which is what the bot then relays to the customer (DESIGN.md §4).
export const PlaceroPanel: React.FC = () => {
  const [orders, setOrders] = useState<PanelOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<Filter>('todos');
  const [totalPrompt, setTotalPrompt] = useState<{ id: string; value: string } | null>(null);
  const [payPrompt, setPayPrompt] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<'idle' | 'recording' | 'sent'>('idle');
  const [log, setLog] = useState<string[]>([]);

  const pushLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  const update = (id: string, patch: Partial<PanelOrder>) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const visible = useMemo(
    () => (filter === 'todos' ? orders : orders.filter((o) => o.state === filter)),
    [orders, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    orders.forEach((o) => (c[o.state] = (c[o.state] ?? 0) + 1));
    return c;
  }, [orders]);

  const dayTotal = orders
    .reduce((sum, o) => sum + parseFloat((o.finalTotal ?? o.estimated).replace(',', '.')), 0)
    .toFixed(2)
    .replace('.', ',');

  const confirmTotal = () => {
    if (!totalPrompt) return;
    const value = totalPrompt.value.trim();
    if (!value) return;
    const order = orders.find((o) => o.id === totalPrompt.id);
    update(totalPrompt.id, { state: 'por-cobrar', finalTotal: `${value} €` });
    pushLog(
      `Bot → ${order?.customer}: «Tu pedido está listo. Total: ${value} €. Paga en efectivo, Bizum o tarjeta al recoger.»`
    );
    setTotalPrompt(null);
  };

  const markPaid = (id: string, method: PaymentMethod) => {
    update(id, { state: 'entregado', paidWith: method });
    const order = orders.find((o) => o.id === id);
    pushLog(`Cobrado ${order?.finalTotal} en ${method} · Bot → ${order?.customer}: «Pedido entregado. ¡Que aproveche!»`);
    setPayPrompt(null);
  };

  return (
    <div
      data-fondo="claro"
      className="w-full max-w-3xl mx-auto text-left rounded-2xl overflow-hidden shadow-2xl border border-zinc-300 bg-white text-zinc-900"
    >
      {/* Header. Va marcado como oscuro porque es la única franja verde del
          panel, que por lo demás es blanco. */}
      <div
        data-fondo="oscuro"
        className="bg-green-deep text-white px-5 py-4 flex items-center justify-between"
      >
        <div>
          <h3 className="font-bold text-lg leading-tight">Pescadería Antonio</h3>
          <span className="text-[12px] text-white/70">Mercado San Gonzalo · Cierra 14:00</span>
        </div>
        <span className="text-[12px] bg-confirm/20 text-confirm border border-confirm/30 px-2.5 py-1 rounded-full font-semibold">
          ● Activo hoy
        </span>
      </div>

      {/* Day summary */}
      <div className="bg-mercado-green text-white px-5 py-3 grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-xl font-bold">{orders.length}</div>
          <div className="text-[11px] text-white/70">pedidos</div>
        </div>
        <div>
          <div className="text-xl font-bold">{counts['nuevo'] ?? 0}</div>
          <div className="text-[11px] text-white/70">nuevos</div>
        </div>
        <div>
          <div className="text-xl font-bold">{counts['por-cobrar'] ?? 0}</div>
          <div className="text-[11px] text-white/70">por cobrar</div>
        </div>
        <div>
          <div className="text-xl font-bold">{dayTotal} €</div>
          <div className="text-[11px] text-white/70">del día</div>
        </div>
      </div>

      {/* P02 — daily video upload */}
      <div className="px-5 py-3 border-b border-zinc-200 bg-cream flex items-center justify-between gap-3">
        <div>
          <div className="text-[13px] font-bold">Vídeo del día</div>
          <div className="text-[12px] text-zinc-500">
            {videoState === 'idle' && 'Aún no has subido el vídeo del mostrador.'}
            {videoState === 'recording' && 'Grabando…'}
            {videoState === 'sent' && 'Enviado a 128 clientes suscritos.'}
          </div>
        </div>
        <button
          disabled={videoState === 'sent'}
          onClick={() => {
            setVideoState('recording');
            setTimeout(() => {
              setVideoState('sent');
              pushLog('Vídeo distribuido como plantilla marketing a los suscriptores (P02)');
            }, 1200);
          }}
          className={`px-4 py-2 rounded-full text-[13px] font-bold text-white transition-colors ${
            videoState === 'sent' ? 'bg-zinc-400 cursor-default' : 'bg-whatsapp-green hover:opacity-90 cursor-pointer'
          }`}
        >
          {videoState === 'sent' ? 'Enviado' : videoState === 'recording' ? 'Grabando…' : 'Grabar y enviar'}
        </button>
      </div>

      {/* Filters */}
      <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-zinc-200">
        {FILTERS.map((f) => {
          const n = f.key === 'todos' ? orders.length : counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors cursor-pointer ${
                filter === f.key
                  ? 'bg-mercado-green text-white border-mercado-green'
                  : 'bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              {f.label} {n > 0 && <span className="opacity-70">{n}</span>}
            </button>
          );
        })}
      </div>

      {/* Order list */}
      <div className="p-4 space-y-3 bg-zinc-50 min-h-[220px]">
        {visible.length === 0 && (
          <p className="text-[13px] text-zinc-500 py-6 text-center">No hay pedidos en este estado.</p>
        )}

        {visible.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-lg shadow-sm px-4 py-3 space-y-2"
            style={{ borderLeft: `4px solid ${STATE_COLOR[o.state]}` }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold" style={{ color: STATE_COLOR[o.state] }}>
                {STATE_LABEL[o.state]}
              </span>
              <span className="text-[12px] text-zinc-500">
                {o.customer} · {o.time}
              </span>
            </div>

            <div className="text-[13px] text-zinc-700">
              {o.items.map((it) => `${it.qty} ${it.name}`).join(' · ')}
            </div>

            <div className="text-[12px] text-zinc-500">
              {o.fulfillment} ·{' '}
              {o.finalTotal ? (
                <>
                  Total final: <strong className="text-zinc-800">{o.finalTotal}</strong>
                </>
              ) : (
                <>~{o.estimated} (estimado)</>
              )}
              {o.paidWith && <> · Cobrado en {o.paidWith}</>}
            </div>

            {/* Actions per state */}
            <div className="flex flex-wrap gap-2 pt-1">
              {o.state === 'nuevo' && (
                <>
                  <button
                    onClick={() => {
                      update(o.id, { state: 'preparando' });
                      pushLog(`Bot → ${o.customer}: «Antonio ha aceptado tu pedido y está preparándolo.»`);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-confirm text-white text-[13px] font-semibold cursor-pointer hover:opacity-90"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => {
                      update(o.id, { state: 'incidencia' });
                      pushLog(`Bot → ${o.customer}: «Antonio necesita hablar contigo.» → escalado humano (C11)`);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-cancel text-cancel text-[13px] font-semibold cursor-pointer hover:bg-cancel/5"
                  >
                    Problema
                  </button>
                </>
              )}

              {(o.state === 'aceptado' || o.state === 'preparando') && (
                <>
                  <button
                    onClick={() => setTotalPrompt({ id: o.id, value: '' })}
                    className="px-3.5 py-1.5 rounded-full bg-mercado-green text-white text-[13px] font-semibold cursor-pointer hover:opacity-90"
                  >
                    Listo
                  </button>
                  <button
                    onClick={() => {
                      update(o.id, { state: 'incidencia' });
                      pushLog(`Bot → ${o.customer}: «⚠️ Producto agotado. ¿Lo sustituimos?» (C08)`);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-warning text-warning text-[13px] font-semibold cursor-pointer hover:bg-warning/5"
                  >
                    Agotado
                  </button>
                </>
              )}

              {o.state === 'por-cobrar' &&
                (payPrompt === o.id ? (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[12px] text-zinc-500">Cobrado en:</span>
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m}
                        onClick={() => markPaid(o.id, m)}
                        className="px-3 py-1.5 rounded-full bg-mercado-green text-white text-[13px] font-semibold cursor-pointer hover:opacity-90"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => setPayPrompt(o.id)}
                    className="px-3.5 py-1.5 rounded-full bg-mercado-green text-white text-[13px] font-semibold cursor-pointer hover:opacity-90"
                  >
                    Marcar cobrado
                  </button>
                ))}

              {o.state === 'incidencia' && (
                <span className="text-[12px] text-warning font-semibold">
                  Esperando respuesta del cliente en el chat
                </span>
              )}
            </div>

            {/* Final total prompt — the placero types the weighed total */}
            {totalPrompt?.id === o.id && (
              <div className="mt-2 p-3 bg-cream border border-zinc-200 rounded-lg space-y-2">
                <label className="block text-[12px] font-bold text-zinc-700">
                  Total final tras pesar (obligatorio)
                </label>
                <div className="flex gap-2">
                  <input
                    autoFocus
                    inputMode="decimal"
                    value={totalPrompt.value}
                    onChange={(e) => setTotalPrompt({ id: o.id, value: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && confirmTotal()}
                    placeholder={o.estimated.replace(' €', '')}
                    className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg text-[14px] outline-none focus:ring-1 focus:ring-mercado-green"
                  />
                  <button
                    onClick={confirmTotal}
                    className="px-4 py-2 rounded-lg bg-mercado-green text-white text-[13px] font-bold cursor-pointer hover:opacity-90"
                  >
                    Avisar al cliente
                  </button>
                  <button
                    onClick={() => setTotalPrompt(null)}
                    className="px-3 py-2 rounded-lg border border-zinc-300 text-zinc-600 text-[13px] cursor-pointer hover:bg-zinc-50"
                  >
                    Cancelar
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500">
                  El bot repite este número al cliente. No lo calcula ni lo corrige.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* What the customer receives — makes the bridge visible */}
      <div className="px-5 py-3 bg-white border-t border-zinc-200">
        <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
          Lo que le llega al cliente por WhatsApp
        </div>
        {log.length === 0 ? (
          <p className="text-[13px] text-zinc-400">Cada acción de arriba dispara un mensaje aquí.</p>
        ) : (
          <ul className="space-y-1.5">
            {log.map((l, i) => (
              <li key={i} className="text-[13px] text-zinc-700 leading-snug">
                {l}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
