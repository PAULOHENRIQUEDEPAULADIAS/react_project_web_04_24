import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router-dom";

// AuthContext para gerenciar o estado de autenticação
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Função de verificação de autenticação
const isAuthenticated = () => {
  const session = localStorage.getItem("session");

  if (session) throw redirect("/");
  return null;
};

// Função de verificação de páginas protegidas
const handleVerificationProtected = () => {
  const session = localStorage.getItem("session");

  if (!session) throw redirect("/signin");
  return null;
};

// Função de login
const signIn = async (email, password, supabase) => {
  return await supabase.auth.signInWithPassword({
    email, password
  });
};

// Função de cadastro
const signUp = async (email, password, supabase) => {
  return await supabase.auth.signUp({
    email, password
  });
};

export {
  isAuthenticated,
  handleVerificationProtected,
  signIn,
  signUp
};
