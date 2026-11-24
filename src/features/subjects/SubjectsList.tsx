import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Subject } from '../../db/types';
import { useSubjects } from './hooks';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export default function SubjectsList({
  initialSubjects = [],
}: {
  initialSubjects?: Subject[];
}) {
  const subjects = useSubjects();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setSubjects((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
    });
  }
}
