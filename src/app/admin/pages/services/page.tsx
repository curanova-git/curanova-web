"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface ServicesContent {
  hero: {
    title: string;
    subtitle: string;
  };
  services: Array<{
    title: string;
    description: string;
    features: string[];
  }>;
}

export default function ServicesPageEditor() {
  const [content, setContent] = useState<ServicesContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.services);
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
      ...data,
      hero: (data.hero as Record<string, unknown>[])[0],
    };

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "services", data: transformedData }),
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
    { name: "services", label: "Services", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
      { name: "features", label: "Features", type: "array" as const },
    ]},
  ];

  const editorData = {
    hero: [content.hero],
    services: content.services,
  };

  return (
    <ContentEditor
      title="Edit Services Page"
      description="Manage the services and features displayed on your services page."
      initialData={editorData}
      onSave={handleSave}
      fields={fields}
    />
  );
}
