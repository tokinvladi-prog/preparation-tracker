import { useLiveQuery } from 'dexie-react-hooks';
import { activityTypesRepo } from '../../db/repositories/activityTypesRepo';

export const useActivityTypes = () =>
  useLiveQuery(() => activityTypesRepo.list(), []);
