import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from '../pages/HomePage';
import AppLayout from './AppLayout';
import SessionsPage from '../pages/SessionsPage';
import SessionFormPage from '../pages/SessionsFormPage';
import StatsLayout from '../features/stats/StatsLayout';
import StatsPage from '../pages/StatsPage';
import SubjectsPage from '../pages/SubjectsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import MorePage from '../pages/MorePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'sessions',
        element: <SessionsPage />,
        children: [
          {
            path: 'new',
            element: <SessionFormPage />,
          },
          {
            path: ':id/edit',
            element: <SessionFormPage />,
          },
        ],
      },
      {
        path: 'stats',
        element: <StatsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="day" replace />,
          },
          {
            path: ':period',
            element: <StatsPage />,
          },
        ],
      },
      {
        path: 'subjects',
        element: <SubjectsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'more',
        element: <MorePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
