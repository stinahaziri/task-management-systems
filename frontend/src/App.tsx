import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"

import UserManagement from './pages/UserManagement';
import AddTask from './pages/addTask';
import InfoTask from './pages/infoTask';

function AppRoutes() {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<UserManagement/>} />
      <Route path="/addTask" element={<AddTask/>} />
      <Route path="/infoTask/:id" element={<InfoTask/>}/>
    </Routes>
  );
}

export default AppRoutes;
