"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export default function HomePageEditor() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.home);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async (data: Record<string, unknown>) => {
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "home", data }),
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
      { name: "subtitle", label: "Subtitle", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
      { name: "ctaText", label: "CTA Button Text", type: "text" as const },
    ]},
    { name: "features", label: "Features", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
      { name: "icon", label: "Icon Name", type: "text" as const },
    ]},
    { name: "stats", label: "Statistics", type: "object-array" as const, arrayFields: [
      { name: "value", label: "Value", type: "text" as const },
      { name: "label", label: "Label", type: "text" as const },
    ]},
  ];

  // Flatten hero object into array format for editor
  const editorData = {
    hero: [content.hero],
    features: content.features,
    stats: content.stats,
  };

  const handleSaveTransform = async (data: Record<string, unknown>) => {
    // Transform back: take first item from hero array
    const transformedData = {
      ...data,
      hero: (data.hero as Record<string, unknown>[])[0],
    };
    await handleSave(transformedData);
  };

  return (
    <ContentEditor
      title="Edit Home Page"
      description="Manage the hero section, features, and statistics displayed on your home page."
      initialData={editorData}
      onSave={handleSaveTransform}
      fields={fields}
    />
  );
}
