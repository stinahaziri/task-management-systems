import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Faqet tua
import UserManagement from './pages/UserManagement';
import AddTask from './pages/addTask';
import InfoTask from './pages/infoTask';
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/pricing";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import SignIn from './pages/SignIn';
import AdminManagement  from "./pages/AdminManagement"

import { UserProvider } from './Context/useAuth'; 
import AuthService from './Services/AuthService';

function AppRoutes() {
  return (
    <UserProvider> 
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Index />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} /> 
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />
      
        {/* Task Pages */}
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/infoTask/:id" element={<InfoTask />} />

       
        <Route path="/authService" element={<AuthService />} />

{/* rolet */}
 <Route path="/userManagment" element={<UserManagement />} />
         <Route path="/adminManagement" element={<AdminManagement />} />
      </Routes>

      <ToastContainer />
    </UserProvider>
  );
}

export default AppRoutes;