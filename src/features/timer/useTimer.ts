import { useContext } from 'react';
import { TimerContext } from './timerContext';

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer нужно вызывать внутри <TimerProvider>');
  return ctx;
}
