import type { ActivityType, Settings, Subject } from './types';

export const SEED_SUBJECTS: Omit<Subject, 'id'>[] = [
  {
    name: 'Профильная математика',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: 'Русский язык',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: 'Информатика',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: 'Физика',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: 'Обществознание',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: 'Литература',
    color: '#4338ca',
    archived: false,
    order: 1,
    createdAt: Date.now(),
  },
];
export const SEED_ACTIVITY_TYPES: Omit<ActivityType, 'id'>[] = [
  { name: 'Теория', order: 1 },
  { name: 'Задачи', order: 2 },
  { name: 'Пробник', order: 3 },
  { name: 'Разбор ошибок', order: 4 },
  { name: 'Повторение', order: 5 },
];
export const DEFAULT_SETTINGS: Settings = {
  id: 'app',
  defaultSubjectId: null,
  defaultActivityTypeId: null,
  dailyGoalMin: 0,
  weeklyGoalMin: 0,
  weekStartsOn: 1,
};
