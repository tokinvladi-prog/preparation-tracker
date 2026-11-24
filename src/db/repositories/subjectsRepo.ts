import { db } from '../schema';
import type { Subject } from '../types';

export const subjectsRepo = {
  listAll: () => db.subjects.orderBy('order').toArray(),
  listActive: () =>
    db.subjects
      .orderBy('order')
      .filter((s) => !s.archived)
      .toArray(),
  getById: (id: number) => db.subjects.get(id),

  async createImageBitmap(input: { name: string; color: string }) {
    const last = await db.subjects.orderBy('order').last();
    return db.subjects.add({
      ...input,
      archived: false,
      order: (last?.order ?? 0) + 1,
      createdAt: Date.now(),
    });
  },
  update: (id: number, patch: Partial<Omit<Subject, 'id'>>) =>
    db.subjects.update(id, patch),
  archive: (id: number) => db.subjects.update(id, { archived: true }),
  restore: (id: number) => db.subjects.update(id, { archived: false }),
};
