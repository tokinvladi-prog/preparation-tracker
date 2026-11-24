import { useLiveQuery } from 'dexie-react-hooks';
import { subjectsRepo } from '../../db/repositories/subjectsRepo';

export const useSubjects = () =>
  useLiveQuery(() => subjectsRepo.listActive(), []);
export const useAllSubjects = () =>
  useLiveQuery(() => subjectsRepo.listAll(), []);
export const useSubject = (id?: number) =>
  useLiveQuery(() => (id == null ? undefined : subjectsRepo.getById(id)), [id]);
