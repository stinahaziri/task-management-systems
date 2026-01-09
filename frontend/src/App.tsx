import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"

import UserManagement from './pages/UserManagement';
import AddTask from './pages/addTask';
import InfoTask from './pages/infoTask';
import Index from"./pages/Index"
import About from"./pages/About"
import Pricing from "./pages/pricing"
import Contact from "./pages/contact"

import Login from"./pages/Login"
import SignIn from './pages/SignIn';


function AppRoutes() {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<Index/>}/>
      <Route path="/userManagment" element={<UserManagement/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/contact" element={<Contact/>} />\
      <Route path="/login" element={<Login/>} />
      <Route path="/signIn" element={<SignIn/>} />
    

      <Route path="/addTask" element={<AddTask/>} />
      <Route path="/infoTask/:id" element={<InfoTask/>}/>
      
    </Routes>
  );
}

export default AppRoutes;
