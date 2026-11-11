import { NavLink } from 'react-router';

export default function MorePage() {
  return (
    <section>
      <header>
        <h1>Еще</h1>
      </header>
      <main>
        <NavLink to="/subjects">Предметы</NavLink>
        <NavLink to="/settings">Настройки</NavLink>
      </main>
    </section>
  );
}
