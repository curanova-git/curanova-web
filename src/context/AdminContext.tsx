"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  content: Record<string, unknown> | null;
  updateContent: (page: string, path: string, value: unknown) => Promise<void>;
  saveAllChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  refreshContent: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, Record<string, unknown>>>({});

  // Check if user is authenticated as admin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        const data = await response.json();
        setIsAdmin(data.authenticated);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  // Load content
  const refreshContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  // Update content locally and track changes
  const updateContent = async (page: string, path: string, value: unknown) => {
    if (!content) return;

    // Update local content state
    const newContent = { ...content };
    const pathParts = path.split(".");
    let current: Record<string, unknown> = newContent[page] as Record<string, unknown>;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (part.includes("[")) {
        const [arrayName, indexStr] = part.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        current = (current[arrayName] as Record<string, unknown>[])[index] as Record<string, unknown>;
      } else {
        current = current[part] as Record<string, unknown>;
      }
    }

    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart.includes("[")) {
      const [arrayName, indexStr] = lastPart.split("[");
      const index = parseInt(indexStr.replace("]", ""));
      (current[arrayName] as unknown[])[index] = value;
    } else {
      current[lastPart] = value;
    }

    setContent(newContent);

    // Track pending changes
    setPendingChanges(prev => ({
      ...prev,
      [page]: newContent[page] as Record<string, unknown>
    }));
    setHasUnsavedChanges(true);
  };

  // Save all pending changes
  const saveAllChanges = async () => {
    for (const [page, data] of Object.entries(pendingChanges)) {
      try {
        const response = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page, data }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${page}`);
        }
      } catch (error) {
        console.error(`Error saving ${page}:`, error);
        throw error;
      }
    }

    setPendingChanges({});
    setHasUnsavedChanges(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        setEditMode,
        content,
        updateContent,
        saveAllChanges,
        hasUnsavedChanges,
        refreshContent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
