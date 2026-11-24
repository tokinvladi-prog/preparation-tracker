import { db } from '../schema';
import type { Settings } from '../types';

export const settingsRepo = {
  get: () => db.settings.get('app'),
  update: (patch: Partial<Omit<Settings, 'id'>>) =>
    db.settings.update('app', patch),
};
