"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface ContactContent {
  hero: {
    title: string;
    subtitle: string;
  };
  info: {
    email: string;
    phone: string;
    address: string;
  };
}

export default function ContactPageEditor() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.contact);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async (data: Record<string, unknown>) => {
    const transformedData = {
      hero: (data.hero as Record<string, unknown>[])[0],
      info: (data.info as Record<string, unknown>[])[0],
    };

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "contact", data: transformedData }),
    });

    if (!response.ok) {
      throw new Error("Failed to save");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8">
        <p className="text-red-600">Failed to load content</p>
      </div>
    );
  }

  const fields = [
    { name: "hero", label: "Hero Section", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "subtitle", label: "Subtitle", type: "textarea" as const },
    ]},
    { name: "info", label: "Contact Information", type: "object-array" as const, arrayFields: [
      { name: "email", label: "Email Address", type: "text" as const },
      { name: "phone", label: "Phone Number", type: "text" as const },
      { name: "address", label: "Address", type: "textarea" as const },
    ]},
  ];

  const editorData = {
    hero: [content.hero],
    info: [content.info],
  };

  return (
    <ContentEditor
      title="Edit Contact Page"
      description="Manage contact information and page content."
      initialData={editorData}
      onSave={handleSave}
      fields={fields}
    />
  );
}
