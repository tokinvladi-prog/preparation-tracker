import { db } from '../schema';

export const activityTypesRepo = {
  list: () => db.activityTypes.orderBy('order').toArray(),
};
