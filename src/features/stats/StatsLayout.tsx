import { NavLink, Outlet } from 'react-router';

export default function StatsLayout() {
  return (
    <section>
      <header>
        <h1>Статистика</h1>
        <nav>
          <NavLink to="/stats/day">День</NavLink>
          <NavLink to="/stats/week">Неделя</NavLink>
          <NavLink to="/stats/month">Месяц</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
