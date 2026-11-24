import { useSubjects } from '../features/subjects/hooks';
import SortableSubjectItem from '../features/subjects/SortableSubjectItem';
import { Button } from '../shared/ui/Button';

export default function SubjectsPage() {
  const subjects = useSubjects();

  return (
    <section>
      <header className="flex items-center justify-between px-5 py-5 pb-2">
        <h1 className="text-2xl font-bold">Предметы</h1>
        <Button>+ Добавить</Button>
      </header>
      <main className="px-5 py-1">
        <article className="px-4 py-2">
          <ul className="flex flex-col gap-2">
            {subjects?.map((s) => (
              <SortableSubjectItem subject={s} />
            ))}
          </ul>
        </article>
      </main>
    </section>
  );
}
