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
    <div className="min-h-screen flex flex-col md:flex-row">
      <header
        className="bg-white border-b border-stone-200 
      md:border-r md:w-58 md:px-4 md:py-6"
      >
        <nav>
          <div
            className="flex md:hidden
            w-full items-center"
          >
            {navItems.slice(0, 3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex-1 h-16 flex items-center justify-center
                transition-all duration-300 ease-out ${
                  isActive
                    ? 'text-indigo-700 font-bold border-b-3'
                    : 'font-medium'
                }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/more"
              className={({ isActive }) =>
                `flex-1 h-16 flex items-center justify-center
              transition-all duration-300 ease-out ${
                isActive
                  ? 'text-indigo-700 font-bold border-b-3'
                  : 'font-medium'
              }`
              }
            >
              Еще
            </NavLink>
          </div>
          <div className="hidden md:flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 min-h-11 flex items-center
                transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold rounded-xl'
                    : 'font-medium'
                }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
