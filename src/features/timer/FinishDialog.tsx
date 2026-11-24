// features/timer/FinishDialog.tsx
import { useState } from 'react';
import { formatClock } from './timerLogic';
import { Button } from '../../shared/ui/Button';
import { Modal } from '../../shared/ui/Modal';

interface Props {
  open: boolean;
  elapsedMs: number;
  label: string; // «Профильная математика · Задачи»
  onSave: (note: string) => Promise<void>;
  onContinue: () => void;
  onDiscard: () => void;
}

export function FinishDialog({ open, onContinue, ...rest }: Props) {
  return (
    <Modal open={open} onClose={onContinue} title="Завершить сессию?">
      <FinishBody onContinue={onContinue} {...rest} />
    </Modal>
  );
}

function FinishBody({
  elapsedMs,
  label,
  onSave,
  onContinue,
  onDiscard,
}: Omit<Props, 'open'>) {
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const tooShort = elapsedMs < 60_000;

  async function save() {
    setBusy(true);
    try {
      await onSave(note);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      <p className="font-semibold">{label}</p>
      <p className="text-4xl font-bold tabular-nums">
        {formatClock(elapsedMs)}
      </p>
      {tooShort && (
        <p className="text-sm text-amber-700">
          Сессия короче минуты. Сохранить её всё равно?
        </p>
      )}
      <label className="flex flex-col gap-1.5 text-sm text-stone-600">
        Заметка
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Что делали? Например: задания 13–15"
          className="rounded-xl border border-stone-500 px-3.5 py-3 text-base text-stone-900"
        />
      </label>
      <Button fullWidth disabled={busy} onClick={save}>
        {tooShort ? 'Всё равно сохранить' : 'Сохранить'}
      </Button>
      <Button
        fullWidth
        variant="secondary"
        disabled={busy}
        onClick={onContinue}
      >
        Продолжить таймер
      </Button>
      <Button
        fullWidth
        variant="ghost"
        disabled={busy}
        onClick={onDiscard}
        className="text-rose-700 hover:bg-rose-50"
      >
        Отменить без сохранения
      </Button>
    </div>
  );
}
