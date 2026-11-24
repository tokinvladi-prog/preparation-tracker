import { useState } from 'react';
import type { ActivityType, Subject } from '../../db/types';
import { Button } from '../../shared/ui/Button';
import { Modal } from '../../shared/ui/Modal';

interface Props {
  subjects: Subject[];
  types: ActivityType[];
  subjectId: number | null;
  typeId: number | null;
  onSubjectChange: (id: number) => void;
  onTypeChange: (id: number) => void;
}

export function SubjectPicker({
  subjects,
  types,
  subjectId,
  typeId,
  onSubjectChange,
  onTypeChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const subject = subjects.find((s) => s.id === subjectId);
  const type = types.find((t) => t.id === typeId);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex min-h-13 w-full items-center gap-2.5 rounded-xl border border-stone-500 bg-white px-3.5 text-left font-semibold"
      >
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: subject?.color }}
        />
        <span className="flex-1">{subject?.name ?? 'Выберите предмет'}</span>
        <span className="text-sm font-normal text-stone-600">{type?.name}</span>
        <span aria-hidden="true" className="text-stone-600">
          ▾
        </span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Что учим?">
        <div className="mt-4 flex flex-col gap-2">
          {subjects.map((s) => {
            const checked = s.id === subjectId;
            return (
              <label
                key={s.id}
                className={`flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border-2 px-3.5 font-semibold ${
                  checked
                    ? 'border-indigo-700 bg-indigo-50'
                    : 'border-stone-200'
                }`}
              >
                <input
                  type="radio"
                  name="subject"
                  checked={checked}
                  onChange={() => onSubjectChange(s.id)}
                  className="size-5 accent-indigo-700"
                />
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.name}
              </label>
            );
          })}
        </div>

        <p className="mt-5 mb-2 text-sm text-stone-600">Тип активности</p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === typeId}
              onClick={() => onTypeChange(t.id)}
              className={`min-h-11 rounded-full border px-4 font-semibold ${
                t.id === typeId
                  ? 'border-indigo-700 bg-indigo-700 text-white'
                  : 'border-stone-500 bg-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <Button fullWidth className="mt-6" onClick={() => setOpen(false)}>
          Готово
        </Button>
      </Modal>
    </>
  );
}
