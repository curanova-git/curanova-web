"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
}

export default function AboutPageEditor() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.about);
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
      mission: (data.mission as Record<string, unknown>[])[0],
      vision: (data.vision as Record<string, unknown>[])[0],
      values: data.values,
    };

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "about", data: transformedData }),
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
    { name: "mission", label: "Mission", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
    ]},
    { name: "vision", label: "Vision", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
    ]},
    { name: "values", label: "Core Values", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
    ]},
  ];

  const editorData = {
    hero: [content.hero],
    mission: [content.mission],
    vision: [content.vision],
    values: content.values,
  };

  return (
    <ContentEditor
      title="Edit About Page"
      description="Manage the company information, mission, vision, and values."
      initialData={editorData}
      onSave={handleSave}
      fields={fields}
    />
  );
}
