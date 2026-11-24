import { useState, type ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  requireText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, ...body }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={body.onCancel} title={title}>
      <ConfirmBody {...body} />
    </Modal>
  );
}

function ConfirmBody({
  description,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  variant = 'primary',
  requireText,
  onConfirm,
  onCancel,
}: Omit<ConfirmDialogProps, 'open' | 'title'>) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const canConfirm = !requireText || text === requireText;

  async function handleConfirm() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-4">
      {description && <p className="text-stone-600">{description}</p>}
      {requireText && (
        <label className="flex flex-col gap-1.5 text-sm text-stone-600">
          Введите слово {requireText} для подтверждения
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-12 rounded-xl border border-stone-500 px-3.5 text-base text-stone-900"
          />
        </label>
      )}
      <div className="flex flex-col gap-2 sm:flex-row-reverse">
        <Button
          variant={variant}
          disabled={!canConfirm || busy}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
        <Button variant="secondary" disabled={busy} onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
}
