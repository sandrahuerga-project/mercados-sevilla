import React, { useEffect, useRef, useState } from 'react';
import type { FlowScript, FlowStep } from './types';
import {
  BotBubble,
  DateSeparator,
  ReplyButtons,
  SystemPill,
  TypingBubble,
  UserBubble,
  AudioBubble,
  VideoBubble,
  HumanBubble,
  FlowCTAButton,
} from '../components/ChatBubbles';
import { WhatsAppFlowModal } from '../components/WhatsAppFlowModal';

// Renders WhatsApp *bold* formatting (the only rich text WA supports besides _italic_ and ~strike~)
const formatWa = (text: string): React.ReactNode => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <strong key={i}>{part.slice(1, -1)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

// A rendered entry: either a script step or the user echo of a tapped button
type Entry =
  | { type: 'step'; id: string; step: FlowStep }
  | { type: 'echo'; label: string; timestamp: string };

const AUTO_DELAY = 450;
const TYPING_DELAY = 1000;

interface FlowPlayerProps {
  script: FlowScript;
  onEnded?: () => void;
  resetKey?: number;
}

export const FlowPlayer: React.FC<FlowPlayerProps> = ({ script, onEnded, resetKey = 0 }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(script.start);
  const [typing, setTyping] = useState(false);
  const [flowModal, setFlowModal] = useState<{ open: boolean; next: string | null }>({
    open: false,
    next: null,
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Reset when resetKey changes
  useEffect(() => {
    clearTimers();
    setEntries([]);
    setTyping(false);
    setFlowModal({ open: false, next: null });
    setCurrentId(script.start);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, script.id]);

  // Advance the script
  useEffect(() => {
    if (!currentId) return;
    const step = script.steps[currentId];
    if (!step) return;

    const commit = (next: string | null) => {
      setEntries((prev) => [...prev, { type: 'step', id: currentId, step }]);
      setCurrentId(next);
    };

    if (step.kind === 'bot') {
      setTyping(true);
      timers.current.push(
        setTimeout(() => {
          setTyping(false);
          commit(step.next);
        }, TYPING_DELAY)
      );
    } else if (step.kind === 'buttons' || step.kind === 'waflow') {
      // Render and wait for user input
      setEntries((prev) => [...prev, { type: 'step', id: currentId, step }]);
      setCurrentId(null);
    } else if (step.kind === 'end') {
      commit(null);
      onEnded?.();
    } else {
      timers.current.push(
        setTimeout(() => commit(step.next), AUTO_DELAY)
      );
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [entries, typing]);

  const handleButton = (entryIdx: number, label: string, next: string) => {
    const buttonsEntry = entries[entryIdx];
    if (buttonsEntry?.type !== 'step' || buttonsEntry.step.kind !== 'buttons') return;
    const ts = buttonsEntry.step.timestamp ?? '09:00';
    // Remove the buttons (WA hides quick replies once tapped) and echo the tap as a user message
    setEntries((prev) => [
      ...prev.slice(0, entryIdx),
      ...prev.slice(entryIdx + 1),
      { type: 'echo', label, timestamp: ts },
    ]);
    setCurrentId(next);
  };

  return (
    <div className="flex-1 py-2">
      {entries.map((entry, idx) => {
        if (entry.type === 'echo') {
          return <UserBubble key={`echo-${idx}`} timestamp={entry.timestamp} text={entry.label} />;
        }
        const { step } = entry;
        switch (step.kind) {
          case 'date':
            return <DateSeparator key={entry.id} text={step.text} />;
          case 'bot':
            return (
              <BotBubble
                key={entry.id}
                puestoName={step.puesto}
                timestamp={step.timestamp}
                warning={step.warning}
              >
                <div className="whitespace-pre-wrap">{formatWa(step.text)}</div>
              </BotBubble>
            );
          case 'user':
            return <UserBubble key={entry.id} timestamp={step.timestamp} text={step.text} />;
          case 'human':
            return (
              <HumanBubble key={entry.id} name={step.name} timestamp={step.timestamp}>
                {formatWa(step.text)}
              </HumanBubble>
            );
          case 'system':
            return <SystemPill key={entry.id} text={step.text} type={step.tone} />;
          case 'audio':
            return (
              <AudioBubble
                key={entry.id}
                sender={step.sender}
                duration={step.duration}
                timestamp={step.timestamp}
              />
            );
          case 'video':
            return (
              <VideoBubble
                key={entry.id}
                puestoName={step.puesto}
                timestamp={step.timestamp}
                caption={formatWa(step.caption)}
                footer={step.footer}
                duration={step.duration}
                imageUrl={step.imageUrl}
              />
            );
          case 'buttons':
            return (
              <ReplyButtons
                key={entry.id}
                buttons={step.buttons.map((b) => b.label)}
                onButtonClick={(label) => {
                  const target = step.buttons.find((b) => b.label === label);
                  if (target) handleButton(idx, label, target.next);
                }}
              />
            );
          case 'waflow':
            return (
              <FlowCTAButton
                key={entry.id}
                label={step.ctaLabel}
                onClick={() => setFlowModal({ open: true, next: step.next })}
              />
            );
          case 'end':
            return step.note ? <SystemPill key={entry.id} text={step.note} type="blue" /> : null;
          default:
            return null;
        }
      })}
      {typing && <TypingBubble />}
      <div ref={scrollRef} />
      <WhatsAppFlowModal
        isOpen={flowModal.open}
        onClose={() => setFlowModal({ open: false, next: null })}
        onSubmit={() => {
          const next = flowModal.next;
          setFlowModal({ open: false, next: null });
          // Remove the CTA (the Flow was completed) and continue the script
          setEntries((prev) =>
            prev.filter((e) => !(e.type === 'step' && e.step.kind === 'waflow'))
          );
          setCurrentId(next);
        }}
      />
    </div>
  );
};
