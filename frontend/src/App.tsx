import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"

import UserManagement from './pages/UserManagement';
import AddTask from './pages/addTask';

function AppRoutes() {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<UserManagement/>} />
      <Route path="/addTask" element={<AddTask/>} />
    </Routes>
  );
}

export default AppRoutes;
