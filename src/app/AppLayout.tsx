import { NavLink, Outlet } from 'react-router';

const navItems = [
  { to: '/', label: 'Главная', end: true },
  { to: '/sessions', label: 'Сессии' },
  { to: '/stats', label: 'Статистика' },
  { to: '/subjects', label: 'Предметы' },
  { to: '/settings', label: 'Настройки' },
];

export default function AppLayout() {
  return (
    <>
      <header>
        <nav className="flex items-center">
          <div className="flex md:hidden">
            {navItems.slice(0, 3).map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/more">Еще</NavLink>
          </div>
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
