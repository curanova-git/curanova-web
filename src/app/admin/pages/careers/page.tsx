"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface CareersContent {
  hero: {
    title: string;
    subtitle: string;
  };
  benefits: Array<{
    title: string;
    description: string;
  }>;
  positions: Array<{
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }>;
}

export default function CareersPageEditor() {
  const [content, setContent] = useState<CareersContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.careers);
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
      benefits: data.benefits,
      positions: data.positions,
    };

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "careers", data: transformedData }),
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
    { name: "benefits", label: "Benefits", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Title", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
    ]},
    { name: "positions", label: "Open Positions", type: "object-array" as const, arrayFields: [
      { name: "title", label: "Job Title", type: "text" as const },
      { name: "department", label: "Department", type: "text" as const },
      { name: "location", label: "Location", type: "text" as const },
      { name: "type", label: "Job Type", type: "text" as const },
      { name: "description", label: "Description", type: "textarea" as const },
    ]},
  ];

  const editorData = {
    hero: [content.hero],
    benefits: content.benefits,
    positions: content.positions,
  };

  return (
    <ContentEditor
      title="Edit Careers Page"
      description="Manage job listings, benefits, and career information."
      initialData={editorData}
      onSave={handleSave}
      fields={fields}
    />
  );
}
