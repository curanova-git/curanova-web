"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface CandidateUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  bio: string | null;
  linkedInUrl: string | null;
  portfolioUrl: string | null;
  resumePath: string | null;
}

interface CandidateContextType {
  user: CandidateUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const CandidateContext = createContext<CandidateContextType | null>(null);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CandidateUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/careers/candidate/verify");
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/careers/candidate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error };
      }

      await checkAuth();
      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred" };
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const res = await fetch("/api/careers/candidate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error };
      }

      await checkAuth();
      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/careers/candidate/logout", { method: "POST" });
      setUser(null);
      router.push("/careers");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <CandidateContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidate() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within CandidateProvider");
  }
  return context;
}
