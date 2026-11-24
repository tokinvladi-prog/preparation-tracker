import { useState } from 'react';
import { Link } from 'react-router';
import { useSubjects, useSubject } from '../subjects/hooks';
import { useSettings } from '../settings/hooks';
import { useActivityTypes } from './hooks';
import { useTimer } from './useTimer';
import { SubjectPicker } from './SubjectPicker';
import { FinishDialog } from './FinishDialog';
import { formatClock } from './timerLogic';
import { formatTime } from '../../shared/lib/format';
import { Button } from '../../shared/ui/Button';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { EmptyState } from '../../shared/ui/EmptyState';
import { Modal } from '../../shared/ui/Modal';

const FORGOTTEN_AFTER_MS = 6 * 3600_000;
const CARD = 'rounded-2xl border border-stone-200 bg-white p-5 sm:p-8';

export function TimerPanel() {
  const { timer, elapsedMs, start, pause, resume, finish, cancel } = useTimer();
  const subjects = useSubjects();
  const types = useActivityTypes();
  const settings = useSettings();
  const activeSubject = useSubject(timer?.subjectId);

  const [pickedSubject, setPickedSubject] = useState<number | null>(null);
  const [pickedType, setPickedType] = useState<number | null>(null);
  const [finishOpen, setFinishOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [forgotDismissed, setForgotDismissed] = useState(false);

  const subjectId =
    [pickedSubject, settings?.defaultSubjectId, subjects?.[0]?.id].find(
      (id) => id != null && subjects?.some((s) => s.id === id),
    ) ?? null;
  const typeId =
    [pickedType, settings?.defaultActivityTypeId, types?.[0]?.id].find(
      (id) => id != null && types?.some((t) => t.id === id),
    ) ?? null;

  if (timer === undefined || !subjects || !types) {
    return (
      <div className={CARD} aria-busy="true">
        <div className="h-40 animate-pulse rounded-xl bg-stone-200" />
      </div>
    );
  }

  if (timer === null) {
    if (subjects.length === 0) {
      return (
        <div className={CARD}>
          <EmptyState
            title="Нет предметов"
            description="Добавьте хотя бы один предмет, чтобы запустить таймер."
            action={
              <Link to="/subjects" className="font-semibold text-indigo-700">
                Перейти к предметам
              </Link>
            }
          />
        </div>
      );
    }
    return (
      <div className={CARD}>
        <time
          role="timer"
          className="block text-center text-6xl font-bold tabular-nums text-stone-600"
        >
          {formatClock(0)}
        </time>
        <div className="mx-auto mt-6 max-w-md">
          <SubjectPicker
            subjects={subjects}
            types={types}
            subjectId={subjectId}
            typeId={typeId}
            onSubjectChange={setPickedSubject}
            onTypeChange={setPickedType}
          />
          <Button
            fullWidth
            className="mt-5 min-h-14 text-lg"
            disabled={subjectId == null || typeId == null}
            onClick={() => start(subjectId!, typeId!)}
          >
            Старт
          </Button>
        </div>
      </div>
    );
  }

  const typeName = types.find((t) => t.id === timer.activityTypeId)?.name ?? '';
  const label = `${activeSubject?.name ?? '…'} · ${typeName}`;
  const paused = timer.status === 'paused';
  const forgotten =
    elapsedMs > FORGOTTEN_AFTER_MS && !forgotDismissed && !finishOpen;

  async function onFinishClick() {
    if (timer?.status === 'running') await pause(); // время не идёт, пока пишем заметку
    setFinishOpen(true);
  }
  async function onContinue() {
    await resume();
    setFinishOpen(false);
  }
  async function onSave(note: string) {
    await finish(note);
    setFinishOpen(false);
  }

  return (
    <div className={CARD}>
      <p className="flex items-center justify-center gap-2 font-semibold">
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: activeSubject?.color }}
        />
        {label}
      </p>
      <time
        role="timer"
        className="my-3 block text-center text-6xl font-bold tabular-nums sm:text-7xl"
      >
        {formatClock(elapsedMs)}
      </time>
      <p className="text-center text-sm text-stone-600">
        {paused ? 'На паузе' : 'Идёт запись'} · начато в{' '}
        {formatTime(timer.startedAt)}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          onClick={() => (paused ? resume() : pause())}
        >
          {paused ? 'Продолжить' : 'Пауза'}
        </Button>
        <Button onClick={onFinishClick}>Завершить</Button>
      </div>
      <Button
        variant="ghost"
        fullWidth
        className="mt-2 text-rose-700 hover:bg-rose-50"
        onClick={() => setCancelOpen(true)}
      >
        Отменить таймер
      </Button>

      <FinishDialog
        open={finishOpen}
        elapsedMs={elapsedMs}
        label={label}
        onSave={onSave}
        onContinue={onContinue}
        onDiscard={() => {
          setFinishOpen(false);
          setCancelOpen(true);
        }}
      />

      <ConfirmDialog
        open={cancelOpen}
        variant="danger"
        title="Отменить таймер?"
        description="Время этой сессии не будет сохранено."
        confirmLabel="Отменить таймер"
        cancelLabel="Назад"
        onCancel={() => setCancelOpen(false)}
        onConfirm={async () => {
          await cancel();
          setCancelOpen(false);
        }}
      />

      <Modal
        open={forgotten}
        onClose={() => setForgotDismissed(true)}
        title="Таймер идёт слишком долго"
      >
        <p className="mt-3 text-stone-600">
          Похоже, вы забыли его выключить: прошло {formatClock(elapsedMs)}. Что
          сделать?
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button onClick={() => finish('')}>Сохранить как есть</Button>
          <Button variant="secondary" onClick={() => cancel()}>
            Отменить таймер
          </Button>
          <Button variant="ghost" onClick={() => setForgotDismissed(true)}>
            Пока оставить
          </Button>
        </div>
      </Modal>
    </div>
  );
}
