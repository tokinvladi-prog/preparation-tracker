import { useAllSubjects } from '../subjects/hooks';
import { useActivityTypes } from '../timer/hooks';
import { useTodaySessions } from '../sessions/hooks';
import { formatDuration, formatTime } from '../../shared/lib/format';

export function TodaySessions() {
  const sessions = useTodaySessions();
  const subjects = useAllSubjects();
  const types = useActivityTypes();
  if (!sessions || !subjects || !types) return null;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="font-bold">Завершено сегодня</h2>
      {sessions.length === 0 ? (
        <p className="mt-2 text-stone-600">Сегодня занятий ещё не было.</p>
      ) : (
        <ul className="mt-2 divide-y divide-stone-200">
          {sessions.map((s) => {
            const subject = subjects.find(
              (x: { id: number }) => x.id === s.subjectId,
            );
            const type = types.find((x) => x.id === s.activityTypeId);
            return (
              <li key={s.id} className="flex items-center gap-3 py-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: subject?.color }}
                />
                <div className="flex-1">
                  <p className="font-semibold">
                    {subject?.name ?? 'Удалённый предмет'}
                  </p>
                  <p className="text-sm text-stone-600">
                    {type?.name} · {formatTime(s.startAt)}
                  </p>
                </div>
                <p className="font-bold">{formatDuration(s.durationSec)}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
