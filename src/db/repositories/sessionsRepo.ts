import { db } from '../schema';

export const sessionsRepo = {
  listByDayKey: (dayKey: string) =>
    db.sessions.where('dayKey').equals(dayKey).reverse().sortBy('startAt'),
};
