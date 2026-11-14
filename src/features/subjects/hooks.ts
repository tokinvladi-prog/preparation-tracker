import { useLiveQuery } from 'dexie-react-hooks';
import { subjectsRepo } from '../../db/repositories/subjectsRepo';

export const useSubjects = () =>
  useLiveQuery(() => subjectsRepo.listActive(), []);
