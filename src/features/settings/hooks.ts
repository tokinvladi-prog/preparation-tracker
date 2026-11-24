import { useLiveQuery } from 'dexie-react-hooks';
import { settingsRepo } from '../../db/repositories/settingsRepo';

export const useSettings = () => useLiveQuery(() => settingsRepo.get(), []);
