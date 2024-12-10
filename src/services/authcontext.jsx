import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router-dom";
import { supabase } from "./supabasedb.js";
// AuthContext para gerenciar o estado de autenticação
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica a sessão armazenada no início
    return !!localStorage.getItem("session");
  });

  (async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("Sessão atual no Supabase:", data, error);
  })();

  const login = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      setIsAuthenticated(false);
    }
  };
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
const handleVerificationProtected = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session) {
    console.log("Sessão inválida ou inexistente. Redirecionando...");
    throw redirect("/");
  }
  return session;
};

// Função de login
const signIn = async (email, password, supabase) => {
  // Certifique-se de que email e password não sejam undefined
  if (!email || !password) {
    console.error("Erro: E-mail ou senha não fornecidos");
    return { data: null, error: { message: "E-mail ou senha ausentes" } };
  }
  console.log("Supabase object:", supabase);

  // Realizando o login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("Sign In Data:", data);
  console.log("Sign In Error:", error);

  if (error) {
    console.error("Erro ao autenticar:", error.message);
  }

  return { data, error };
};

// Função de cadastro
const signUp = async (email, password, supabase) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export { isAuthenticated, handleVerificationProtected, signIn, signUp };
