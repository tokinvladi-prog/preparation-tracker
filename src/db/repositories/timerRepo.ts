import { db } from '../schema';
import type { ActiveTimer } from '../types';
import { getElapsedMs } from '../../features/timer/timerLogic';
import { toDayKey } from '../../shared/lib/date';

export const timerRepo = {
  get: () => db.activeTimer.get('current'),

  start: (subjectId: number, activityTypeId: number) =>
    db.transaction('rw', db.activeTimer, async () => {
      const existing = await db.activeTimer.get('current');
      if (existing) return existing; // защита от двойного старта
      const now = Date.now();
      const t: ActiveTimer = {
        id: 'current',
        subjectId,
        activityTypeId,
        status: 'running',
        startedAt: now,
        accumulatedMs: 0,
        segmentStartedAt: now,
        updatedAt: now,
      };
      await db.activeTimer.add(t);
      return t;
    }),

  pause: () =>
    db.transaction('rw', db.activeTimer, async () => {
      const t = await db.activeTimer.get('current');
      if (!t || t.status !== 'running' || t.segmentStartedAt == null) return;
      const now = Date.now();
      await db.activeTimer.update('current', {
        status: 'paused',
        accumulatedMs: t.accumulatedMs + (now - t.segmentStartedAt),
        segmentStartedAt: null,
        updatedAt: now,
      });
    }),

  resume: () =>
    db.transaction('rw', db.activeTimer, async () => {
      const t = await db.activeTimer.get('current');
      if (!t || t.status !== 'paused') return;
      const now = Date.now();
      await db.activeTimer.update('current', {
        status: 'running',
        segmentStartedAt: now,
        updatedAt: now,
      });
    }),

  finish: (note: string) =>
    db.transaction('rw', db.activeTimer, db.sessions, async () => {
      const t = await db.activeTimer.get('current');
      if (!t) return null; // уже завершили в другой вкладке
      const now = Date.now();
      const id = await db.sessions.add({
        subjectId: t.subjectId,
        activityTypeId: t.activityTypeId,
        startAt: t.startedAt,
        endAt: now,
        durationSec: Math.round(getElapsedMs(t, now) / 1000),
        dayKey: toDayKey(t.startedAt),
        note: note.trim(),
        source: 'timer',
        createdAt: now,
        updatedAt: now,
      });
      await db.activeTimer.delete('current');
      return id;
    }),

  cancel: () => db.activeTimer.delete('current'),
};
