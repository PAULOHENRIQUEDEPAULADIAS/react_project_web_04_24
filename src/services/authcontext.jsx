import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router-dom";
import { supabase } from "./supabasedb.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
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


const isAuthenticated = () => {
  const session = localStorage.getItem("session");
  return !!session; 
};

const handleVerificationProtected = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session) {
    console.log("Sessão inválida ou inexistente. Redirecionando...");
    throw redirect("/");
  }
  return session;
};

const signIn = async (email, password, supabase) => {
  if (!email || !password) {
    console.error("Erro: E-mail ou senha não fornecidos");
    return { data: null, error: { message: "E-mail ou senha ausentes" } };
  }
  console.log("Supabase object:", supabase);

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

const signUp = async (email, password, supabase) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export { isAuthenticated, handleVerificationProtected, signIn, signUp };
