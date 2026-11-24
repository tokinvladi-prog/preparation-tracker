import { useSortable } from '@dnd-kit/sortable';
import type { Subject } from '../../db/types';
import { CSS } from '@dnd-kit/utilities';

export default function SortableSubjectItem({ subject }: { subject: Subject }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subject.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex gap-3 py-1.5 px-1 bg-white rounded-2xl 
                items-center min-h-15 border border-stone-200"
    >
      <button
        type="button"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="w-11 h-11 px-0.5 py-1 flex items-center justify-center"
      >
        <svg
          className="w-full h-full text-stone-700 fill-current"
          viewBox="0 0 24 24"
        >
          <circle cx="10" cy="8" r="1" />
          <circle cx="14" cy="8" r="1" />
          <circle cx="10" cy="12" r="1" />
          <circle cx="14" cy="12" r="1" />
          <circle cx="10" cy="16" r="1" />
          <circle cx="14" cy="16" r="1" />
        </svg>
      </button>
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: subject.color }}
      />
      <h2 className="font-semibold flex-1">{subject.name}</h2>
      <button className="w-11 h-11 px-0.5 py-1 flex items-center justify-center">
        <svg
          className="w-full h-full text-stone-700 fill-current"
          viewBox="0 0 24 24"
        >
          <circle cx="10" cy="12" r="1" />
          <circle cx="14" cy="12" r="1" />
          <circle cx="18" cy="12" r="1" />
        </svg>
      </button>
    </li>
  );
}
