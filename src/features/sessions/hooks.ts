import { useLiveQuery } from 'dexie-react-hooks';
import { toDayKey } from '../../shared/lib/date';
import { sessionsRepo } from '../../db/repositories/sessionsRepo';

export function useTodaySessions() {
  // oxlint-disable-next-line react/purity
  const key = toDayKey(Date.now());
  return useLiveQuery(() => sessionsRepo.listByDayKey(key), [key]);
}
