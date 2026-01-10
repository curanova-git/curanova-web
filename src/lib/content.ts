import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface SiteContent {
  siteInfo: {
    name: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    locations: string[];
    socialLinks: {
      linkedin: string;
      twitter: string;
    };
  };
  home: {
    hero: {
      badge: string;
      headline: string;
      headlineHighlight: string;
      subheadline: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stats: Array<{ value: string; label: string }>;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    platforms: {
      title: string;
      titleHighlight: string;
      description: string;
      platform1: { title: string; description: string };
      platform2: { title: string; description: string };
    };
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  services: {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
    };
    servicesList: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      features: string[];
    }>;
    industries: Array<{
      name: string;
      description: string;
    }>;
  };
  solutions: {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
    };
    clinicalPlatform: {
      label: string;
      title: string;
      description: string;
      features: Array<{ title: string; description: string }>;
    };
    genomicsPlatform: {
      label: string;
      title: string;
      description: string;
      features: Array<{ title: string; description: string }>;
    };
    organizations: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };
  about: {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
    };
    mission: {
      title: string;
      content: string;
      additionalContent: string;
    };
    vision: {
      title: string;
      content: string;
    };
    values: Array<{
      title: string;
      description: string;
    }>;
    team: Array<{
      role: string;
      experience: string;
    }>;
  };
  careers: {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
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
  };
  contact: {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
    };
    info: {
      email: string;
      locations: string[];
      hours: {
        days: string;
        time: string;
      };
    };
  };
}

export function getContent(): SiteContent {
  const filePath = path.join(CONTENT_DIR, 'site.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function saveContent(content: SiteContent): void {
  const filePath = path.join(CONTENT_DIR, 'site.json');
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

export function getPageContent<K extends keyof SiteContent>(page: K): SiteContent[K] {
  const content = getContent();
  return content[page];
}

export function updatePageContent<K extends keyof SiteContent>(
  page: K,
  data: SiteContent[K]
): void {
  const content = getContent();
  content[page] = data;
  saveContent(content);
}
