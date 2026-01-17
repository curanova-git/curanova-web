"use client";

import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";

export default function CaseStudiesPage() {
  const { content } = useAdmin();
  const caseStudiesContent = content?.caseStudies as {
    hero: {
      title: string;
      titleHighlight: string;
      description: string;
    };
    studies: Array<{
      title: string;
      category: string;
      description: string;
      results: string[];
      status: string;
    }>;
    pilotCta: {
      title: string;
      description: string;
      buttonText: string;
    };
    stats: {
      title: string;
      subtitle: string;
      items: Array<{ value: string; label: string }>;
    };
  } | undefined;

  const caseStudies = caseStudiesContent?.studies || [
    {
      title: "Predictive Patient Monitoring",
      category: "Clinical Intelligence",
      description: "How AI-powered early warning systems helped reduce ICU transfers and improve patient outcomes in a multi-specialty hospital setting.",
      results: [
        "30% reduction in unexpected ICU transfers",
        "4-hour earlier intervention on average",
        "Improved patient safety metrics",
      ],
      status: "Coming Soon",
    },
    {
      title: "Pharmacogenomics Integration",
      category: "Genomics",
      description: "Implementing pharmacogenomics-guided prescribing to reduce adverse drug reactions and optimize medication efficacy.",
      results: [
        "Reduced adverse drug events",
        "Optimized drug dosing",
        "Improved treatment outcomes",
      ],
      status: "Coming Soon",
    },
    {
      title: "Population Health Analytics",
      category: "Analytics",
      description: "Leveraging AI and genomic data to identify high-risk populations and enable targeted preventive interventions.",
      results: [
        "Early disease risk identification",
        "Targeted prevention programs",
        "Improved population health outcomes",
      ],
      status: "Coming Soon",
    },
  ];

  const stats = caseStudiesContent?.stats?.items || [
    { value: "30-50%", label: "Reduced ICU Transfers" },
    { value: "20-40%", label: "Lower Readmissions" },
    { value: "4-8hr", label: "Faster Interventions" },
    { value: "25+", label: "Specialty AI Modules" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute right-0 top-0 w-72 h-96 opacity-20">
          <DNAHelix className="h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a5f] mb-6">
              <EditableText page="caseStudies" path="hero.title">
                {caseStudiesContent?.hero?.title || "Case"}
              </EditableText>{" "}
              <EditableText page="caseStudies" path="hero.titleHighlight" as="span" className="gradient-text">
                {caseStudiesContent?.hero?.titleHighlight || "Studies"}
              </EditableText>
            </h1>
            <EditableText
              page="caseStudies"
              path="hero.description"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {caseStudiesContent?.hero?.description || "Real-world examples of how our AI and genomics solutions are transforming healthcare delivery and patient outcomes."}
            </EditableText>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
              >
                <div className="h-48 bg-gradient-to-br from-[#1e3a5f] to-[#14b8a6] flex items-center justify-center">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
                    <EditableText page="caseStudies" path={`studies[${index}].status`}>
                      {study.status}
                    </EditableText>
                  </span>
                </div>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm font-medium mb-4">
                    <EditableText page="caseStudies" path={`studies[${index}].category`}>
                      {study.category}
                    </EditableText>
                  </span>
                  <EditableText
                    page="caseStudies"
                    path={`studies[${index}].title`}
                    as="h3"
                    className="text-xl font-bold text-[#1e3a5f] mb-3"
                  >
                    {study.title}
                  </EditableText>
                  <EditableText
                    page="caseStudies"
                    path={`studies[${index}].description`}
                    as="p"
                    className="text-gray-600 mb-6"
                    multiline
                  >
                    {study.description}
                  </EditableText>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">Expected Outcomes:</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <EditableText page="caseStudies" path={`studies[${index}].results[${i}]`}>
                            {result}
                          </EditableText>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Program CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            page="caseStudies"
            path="pilotCta.title"
            as="h2"
            className="text-4xl font-bold text-[#1e3a5f] mb-6"
          >
            {caseStudiesContent?.pilotCta?.title || "Be Part of Our Story"}
          </EditableText>
          <EditableText
            page="caseStudies"
            path="pilotCta.description"
            as="p"
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            multiline
          >
            {caseStudiesContent?.pilotCta?.description || "We're actively seeking healthcare partners for our pilot programs. Join us in demonstrating the transformative power of AI and genomics in clinical settings."}
          </EditableText>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-brand text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <EditableText page="caseStudies" path="pilotCta.buttonText">
              {caseStudiesContent?.pilotCta?.buttonText || "Become a Partner"}
            </EditableText>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditableText
              page="caseStudies"
              path="stats.title"
              as="h2"
              className="text-3xl font-bold text-white mb-4"
            >
              {caseStudiesContent?.stats?.title || "Our Target Impact"}
            </EditableText>
            <EditableText
              page="caseStudies"
              path="stats.subtitle"
              as="p"
              className="text-white/70"
            >
              {caseStudiesContent?.stats?.subtitle || "The outcomes we're working to achieve"}
            </EditableText>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <EditableText
                  page="caseStudies"
                  path={`stats.items[${index}].value`}
                  as="div"
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                >
                  {stat.value}
                </EditableText>
                <EditableText
                  page="caseStudies"
                  path={`stats.items[${index}].label`}
                  as="div"
                  className="text-[#14b8a6]"
                >
                  {stat.label}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
