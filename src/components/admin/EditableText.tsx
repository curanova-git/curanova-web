"use client";

import { useState, useRef, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

interface EditableTextProps {
  page: string;
  path: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  page,
  path,
  children,
  as: Component = "span",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const { isAdmin, isEditMode, updateContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(String(children || ""));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(String(children || ""));
  }, [children]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin && isEditMode) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== String(children)) {
      updateContent(page, path, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      setIsEditing(false);
      if (value !== String(children)) {
        updateContent(page, path, value);
      }
    }
    if (e.key === "Escape") {
      setValue(String(children || ""));
      setIsEditing(false);
    }
  };

  if (!isAdmin || !isEditMode) {
    return <Component className={className}>{children}</Component>;
  }

  if (isEditing) {
    const inputClassName = `${className} bg-yellow-50 border-2 border-yellow-400 rounded px-2 py-1 outline-none focus:border-yellow-500 w-full`;

    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${inputClassName} min-h-[100px] resize-y`}
          rows={4}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
      />
    );
  }

  return (
    <Component
      className={`${className} cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-yellow-400 hover:bg-yellow-50/50 transition-all rounded`}
      onClick={handleClick}
      title="Click to edit"
    >
      {children}
    </Component>
  );
}
