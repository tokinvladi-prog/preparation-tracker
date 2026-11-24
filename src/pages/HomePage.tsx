// oxlint-disable react/purity
import { TimerPanel } from '../features/timer/TimerPanel';
import { GoalCard } from '../features/home/GoalCard';
import { TodaySessions } from '../features/home/TodaySessions';

const today = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-5 lg:p-10">
      <header>
        <p className="text-sm text-stone-600 first-letter:uppercase">
          {today.format(new Date())}
        </p>
        <h1 className="text-3xl font-bold">Сегодня</h1>
      </header>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TimerPanel />
        </div>
        <div className="lg:col-span-2">
          <GoalCard />
        </div>
      </div>
      <TodaySessions />
    </div>
  );
}
