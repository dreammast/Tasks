import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AddTask from '../pages/AddTask';

const AppRoutes = ({ taskHook }) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard taskHook={taskHook} />} />
      <Route path="/add" element={<AddTask taskHook={taskHook} />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
