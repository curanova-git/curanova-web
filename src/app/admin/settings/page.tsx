"use client";

import { useEffect, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";

interface SiteInfo {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
}

export default function SettingsPage() {
  const [content, setContent] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data.siteInfo);
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
      ...(data.general as Record<string, unknown>[])[0],
      socialLinks: (data.socialLinks as Record<string, unknown>[])[0],
    };

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "siteInfo", data: transformedData }),
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
    { name: "general", label: "General Settings", type: "object-array" as const, arrayFields: [
      { name: "siteName", label: "Site Name", type: "text" as const },
      { name: "tagline", label: "Tagline", type: "text" as const },
      { name: "description", label: "Site Description", type: "textarea" as const },
      { name: "email", label: "Contact Email", type: "text" as const },
      { name: "phone", label: "Phone Number", type: "text" as const },
      { name: "address", label: "Address", type: "textarea" as const },
    ]},
    { name: "socialLinks", label: "Social Media Links", type: "object-array" as const, arrayFields: [
      { name: "linkedin", label: "LinkedIn URL", type: "text" as const },
      { name: "twitter", label: "Twitter URL", type: "text" as const },
    ]},
  ];

  const editorData = {
    general: [{
      siteName: content.siteName,
      tagline: content.tagline,
      description: content.description,
      email: content.email,
      phone: content.phone,
      address: content.address,
    }],
    socialLinks: [content.socialLinks],
  };

  return (
    <ContentEditor
      title="Site Settings"
      description="Manage global site settings, contact information, and social media links."
      initialData={editorData}
      onSave={handleSave}
      fields={fields}
    />
  );
}
