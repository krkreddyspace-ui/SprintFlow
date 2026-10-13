import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Board } from './pages/Board';
import { Backlog } from './pages/Backlog';
import { Analytics } from './pages/Analytics';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Route */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Workspace Shell */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="board" element={<Board />} />
          <Route path="backlog" element={<Backlog />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
