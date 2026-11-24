import { createContext } from 'react';
import type { ActiveTimer } from '../../db/types';

export interface TimerCtx {
  timer: ActiveTimer | null | undefined;
  elapsedMs: number;
  start: (subjectId: number, activityTypeId: number) => Promise<unknown>;
  pause: () => Promise<unknown>;
  resume: () => Promise<unknown>;
  finish: (note: string) => Promise<unknown>;
  cancel: () => Promise<unknown>;
}
export const TimerContext = createContext<TimerCtx | null>(null);
