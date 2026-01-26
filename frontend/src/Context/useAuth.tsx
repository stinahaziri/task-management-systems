import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserProfile } from "../Models/User";
import { loginApi, regitserApi } from "../Services/AuthService"; // Importohet nga fili që dërgove
import { handleError } from "../ErrorHandler";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Kontrolli kur rifreskohet faqja
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    const tokenLocal = localStorage.getItem("token");
    if (userLocal && tokenLocal) {
      setUser(JSON.parse(userLocal));
      setToken(tokenLocal);
    }
    setIsReady(true);
  }, []);

  // Funksioni per Login
 const loginUser = async (username: string, password: string) => {
  try {
    const res = await loginApi(username, password);
    if (res && res.data) {
      localStorage.setItem("token", res.data.token);
      
      const userObj = {
        userName: res.data.userName,
        email: res.data.email,
        role: res.data.role 
      };
      
      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(res.data.token);
      setUser(userObj);
      toast.success("Welcome aboard!");

      // --- LOGJIKA E RE E NAVIGIMIT ---
      if (res.data.role === "Admin") {
        navigate("/adminManagement"); 
      } else {
        navigate("/userManagment"); 
      }
      // --------------------------------
      
    }
  } catch (e) {
    toast.warning("Gabim gjatë kyçjes");
  }
};

  // Funksioni per Regjistrim
  const registerUser = async (email: string, username: string, password: string) => {
    try {
      const res = await regitserApi(email, username, password);
      if (res && res.data) {
        localStorage.setItem("token", res.data.token);
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
           role:res.data.role
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res.data.token);
        setUser(userObj);
        toast.success("Registration successful!");
        navigate("/login");
         return { success: true };
      }
    } catch (e) {
      // toast.warning("Error during registration");
        handleError(e); 
    throw e;  
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};