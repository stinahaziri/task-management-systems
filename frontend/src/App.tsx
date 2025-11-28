import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"

import UserManagement from './pages/UserManagement';

function AppRoutes() {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<UserManagement/>} />
    </Routes>
  );
}

export default AppRoutes;
