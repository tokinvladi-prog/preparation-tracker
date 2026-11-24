import { Link } from 'react-router';
import { useSettings } from '../settings/hooks';
import { useTodaySessions } from '../sessions/hooks';
import { useTimer } from '../timer/useTimer';
import { formatDuration } from '../../shared/lib/format';

export function GoalCard() {
  const settings = useSettings();
  const sessions = useTodaySessions();
  const { timer, elapsedMs } = useTimer();
  if (!settings || !sessions) return null;

  const doneSec =
    sessions.reduce((sum, s) => sum + s.durationSec, 0) +
    (timer ? elapsedMs / 1000 : 0);
  const goalSec = settings.dailyGoalMin * 60;
  const percent =
    goalSec > 0 ? Math.min(100, Math.round((doneSec / goalSec) * 100)) : 0;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="font-bold">Цель на день</h2>
      {goalSec === 0 ? (
        <p className="mt-2 text-stone-600">
          Цель не задана.{' '}
          <Link to="/settings" className="font-semibold text-indigo-700">
            Задать цель
          </Link>
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-stone-600">
            {formatDuration(doneSec)} из {formatDuration(goalSec)}
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Выполнение цели на день"
            className="mt-3 h-2.5 rounded-full bg-stone-200"
          >
            <div
              className="h-full rounded-full bg-indigo-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
    </section>
  );
}
