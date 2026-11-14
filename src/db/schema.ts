import Dexie, { type EntityTable } from 'dexie';
import type {
  ActiveTimer,
  ActivityType,
  Session,
  Settings,
  Subject,
} from './types';
import { DEFAULT_SETTINGS, SEED_ACTIVITY_TYPES, SEED_SUBJECTS } from './seed';

export const db = new Dexie('focus-ege') as Dexie & {
  subjects: EntityTable<Subject, 'id'>;
  activityTypes: EntityTable<ActivityType, 'id'>;
  sessions: EntityTable<Session, 'id'>;
  activeTimer: EntityTable<ActiveTimer, 'id'>;
  settings: EntityTable<Settings, 'id'>;
};

db.version(1).stores({
  subjects: '++id, order',
  activityTypes: '++id, order',
  sessions:
    '++id, startAt, dayKey, subjectId, activityTypeId, [subjectId+startAt]',
  activeTimer: 'id',
  settings: 'id',
});

db.on('populate', () => {
  db.subjects.bulkAdd(SEED_SUBJECTS);
  db.activityTypes.bulkAdd(SEED_ACTIVITY_TYPES);
  db.settings.add(DEFAULT_SETTINGS);
});
