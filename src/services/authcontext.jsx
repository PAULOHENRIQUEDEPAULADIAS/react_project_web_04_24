import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router-dom";

// AuthContext para gerenciar o estado de autenticação
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica a sessão armazenada no início
    return !!localStorage.getItem("session");
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("session");
    localStorage.removeItem("user");
  };

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
  return !!session; // Retorna true se a sessão existir, false caso contrário
};  

// Função de verificação de páginas protegidas
const handleVerificationProtected = () => {
  const session = JSON.parse(localStorage.getItem("session") || "null");

  if (!session) {
    console.log("Sessão inválida ou inexistente. Redirecionando...");
    throw redirect("/signin");
  }

  return null;
};


// Função de login
const signIn = async (email, password, supabase) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao autenticar:", error.message);
  }

  return { data, error };
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
