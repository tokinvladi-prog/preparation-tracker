import type { ActiveTimer } from '../../db/types';

export function getElapsedMs(t: ActiveTimer, now = Date.now()): number {
  const running =
    t.status === 'running' && t.segmentStartedAt != null
      ? now - t.segmentStartedAt
      : 0;
  return Math.max(0, t.accumulatedMs + running);
}

export function formatClock(ms: number): string {
  const total = Math.floor(ms / 1000);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(Math.floor(total / 3600))}:${p(Math.floor((total % 3600) / 60))}:${p(total % 60)}`;
}
