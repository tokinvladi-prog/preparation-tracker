import { useEffect, useState, type ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { timerRepo } from '../../db/repositories/timerRepo';
import { getElapsedMs } from './timerLogic';
import { TimerContext } from './timerContext';

export function TimerProvider({ children }: { children: ReactNode }) {
  const timer = useLiveQuery(async () => (await timerRepo.get()) ?? null, []);
  const [now, setNow] = useState(() => Date.now());
  const status = timer?.status;

  useEffect(() => {
    if (status !== 'running') return;
    const tick = () => setNow(Date.now());
    const id = setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [status]);

  const elapsedMs = timer ? getElapsedMs(timer, now) : 0;

  return (
    <TimerContext.Provider value={{ timer, elapsedMs, ...timerRepo }}>
      {children}
    </TimerContext.Provider>
  );
}
