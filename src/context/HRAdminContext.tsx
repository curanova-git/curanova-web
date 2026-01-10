"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface HRUser {
  email: string;
  name: string | null;
}

interface HRAdminContextType {
  user: HRUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const HRAdminContext = createContext<HRAdminContextType | null>(null);

export function HRAdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<HRUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/careers/auth/verify");
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

  const logout = async () => {
    try {
      await fetch("/api/careers/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/careers/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <HRAdminContext.Provider value={{ user, isLoading, isAuthenticated: !!user, logout }}>
      {children}
    </HRAdminContext.Provider>
  );
}

export function useHRAdmin() {
  const context = useContext(HRAdminContext);
  if (!context) {
    throw new Error("useHRAdmin must be used within HRAdminProvider");
  }
  return context;
}
