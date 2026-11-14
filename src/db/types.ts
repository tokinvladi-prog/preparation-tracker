export interface Subject {
  id: number;
  name: string;
  color: string;
  archived: boolean;
  order: number;
  createdAt: number;
}

export interface ActivityType {
  id: number;
  name: string;
  order: number;
}

export interface Session {
  id: number;
  subjectId: number;
  activityTypeId: number;
  startAt: number;
  endAt: number;
  durationSec: number;
  dayKey: string;
  note: string;
  source: 'timer' | 'manual';
  createdAt: number;
  updatedAt: number;
}

export interface ActiveTimer {
  id: 'current';
  subjectId: number;
  activityTypeId: number;
  status: 'running' | 'paused';
  startedAt: number;
  accumulatedMs: number;
  segmentStartedAt: number | null;
  updatedAt: number;
}

export interface Settings {
  id: 'app';
  defaultSubjectId: number | null;
  defaultActivityTypeId: number | null;
  dailyGoalMin: number;
  weeklyGoalMin: number;
  weekStartsOn: 1;
}
