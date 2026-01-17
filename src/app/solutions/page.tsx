"use client";

import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";

export default function SolutionsPage() {
  const { content } = useAdmin();
  const solutionsContent = content?.solutions as {
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
    organizationsSection: {
      title: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
  } | undefined;

  const clinicalFeatures = solutionsContent?.clinicalPlatform?.features || [
    { title: "Intelligent EMR", description: "AI-enhanced medical records that actively assist clinicians with documentation, diagnosis, and treatment planning." },
    { title: "Predictive Monitoring", description: "Continuous patient monitoring with AI-powered early warning systems that predict deterioration before it happens." },
    { title: "Multi-Specialty AI", description: "Specialized AI modules across clinical domains providing expert-level decision support." },
  ];

  const genomicsFeatures = solutionsContent?.genomicsPlatform?.features || [
    { title: "Advanced Analysis", description: "State-of-the-art genomic sequencing and interpretation powered by AI algorithms." },
    { title: "Actionable Reports", description: "Clear, clinically relevant reports that translate genetic findings into practical health guidance." },
    { title: "Secure Data Vault", description: "Enterprise-grade security with pseudoanonymized storage and patient-controlled access." },
  ];

  const organizations = solutionsContent?.organizations || [
    { title: "Hospitals", description: "Enterprise clinical intelligence and genomics integration for improved patient outcomes and operational efficiency.", features: ["EMR Integration", "Clinical Decision Support", "Predictive Analytics"] },
    { title: "Laboratories", description: "Advanced genomic analysis capabilities with seamless integration and white-label options.", features: ["Genomic Analysis", "Report Generation", "LIS Integration"] },
    { title: "Wellness Centers", description: "Personalized health optimization programs powered by genomic and clinical insights.", features: ["Nutrigenomics", "Lifestyle Optimization", "Preventive Health"] },
    { title: "Schools & Universities", description: "Genomics-based learning optimization and student wellness programs for educational institutions.", features: ["Learning Style Assessment", "Student Wellness Programs", "Talent Identification"] },
  ];

  const orgIcons = [
    <svg key="hospital" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    <svg key="lab" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>,
    <svg key="wellness" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    <svg key="school" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>,
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
              <EditableText page="solutions" path="hero.title">
                {solutionsContent?.hero?.title || "Our"}
              </EditableText>{" "}
              <EditableText page="solutions" path="hero.titleHighlight" as="span" className="gradient-text">
                {solutionsContent?.hero?.titleHighlight || "Solutions"}
              </EditableText>
            </h1>
            <EditableText
              page="solutions"
              path="hero.description"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {solutionsContent?.hero?.description || "Two powerful platforms working together to deliver comprehensive healthcare intelligence and precision medicine capabilities."}
            </EditableText>
          </div>
        </div>
      </section>

      {/* Clinical Intelligence Platform */}
      <section id="clinical" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-medium mb-6">
                <EditableText page="solutions" path="clinicalPlatform.label">
                  {solutionsContent?.clinicalPlatform?.label || "Platform 1"}
                </EditableText>
              </div>
              <EditableText
                page="solutions"
                path="clinicalPlatform.title"
                as="h2"
                className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6"
              >
                {solutionsContent?.clinicalPlatform?.title || "Clinical Intelligence Platform"}
              </EditableText>
              <EditableText
                page="solutions"
                path="clinicalPlatform.description"
                as="p"
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                multiline
              >
                {solutionsContent?.clinicalPlatform?.description || "An AI-powered clinical ecosystem designed to transform healthcare delivery through intelligent decision support, predictive analytics, and seamless workflow integration."}
              </EditableText>

              <div className="space-y-6">
                {clinicalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#14b8a6] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <EditableText
                        page="solutions"
                        path={`clinicalPlatform.features[${index}].title`}
                        as="h3"
                        className="text-lg font-semibold text-[#1e3a5f] mb-1"
                      >
                        {feature.title}
                      </EditableText>
                      <EditableText
                        page="solutions"
                        path={`clinicalPlatform.features[${index}].description`}
                        as="p"
                        className="text-gray-600"
                        multiline
                      >
                        {feature.description}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/ciaas.png"
                alt="Clinical Intelligence as a Service"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Genomics Platform */}
      <section id="genomics" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/gaas.png"
                alt="Genomics as a Service"
                className="w-full h-auto rounded-3xl"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm font-medium mb-6">
                <EditableText page="solutions" path="genomicsPlatform.label">
                  {solutionsContent?.genomicsPlatform?.label || "Platform 2"}
                </EditableText>
              </div>
              <EditableText
                page="solutions"
                path="genomicsPlatform.title"
                as="h2"
                className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6"
              >
                {solutionsContent?.genomicsPlatform?.title || "Genomics as a Service"}
              </EditableText>
              <EditableText
                page="solutions"
                path="genomicsPlatform.description"
                as="p"
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                multiline
              >
                {solutionsContent?.genomicsPlatform?.description || "A comprehensive genomics ecosystem that transforms genetic data into actionable health insights, making precision medicine accessible to everyone."}
              </EditableText>

              <div className="space-y-6">
                {genomicsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <EditableText
                        page="solutions"
                        path={`genomicsPlatform.features[${index}].title`}
                        as="h3"
                        className="text-lg font-semibold text-[#1e3a5f] mb-1"
                      >
                        {feature.title}
                      </EditableText>
                      <EditableText
                        page="solutions"
                        path={`genomicsPlatform.features[${index}].description`}
                        as="p"
                        className="text-gray-600"
                        multiline
                      >
                        {feature.description}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Hospitals Section */}
      <section id="hospitals" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <EditableText
              page="solutions"
              path="organizationsSection.title"
              as="h2"
              className="text-4xl font-bold text-[#1e3a5f] mb-6"
            >
              {solutionsContent?.organizationsSection?.title || "For Healthcare Organizations"}
            </EditableText>
            <EditableText
              page="solutions"
              path="organizationsSection.description"
              as="p"
              className="text-xl text-gray-600"
              multiline
            >
              {solutionsContent?.organizationsSection?.description || "Comprehensive solutions designed to integrate seamlessly with your existing infrastructure and workflows."}
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {organizations.map((org, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center text-white mb-6">
                  {orgIcons[index]}
                </div>
                <EditableText
                  page="solutions"
                  path={`organizations[${index}].title`}
                  as="h3"
                  className="text-xl font-bold text-[#1e3a5f] mb-3"
                >
                  {org.title}
                </EditableText>
                <EditableText
                  page="solutions"
                  path={`organizations[${index}].description`}
                  as="p"
                  className="text-gray-600 mb-6"
                  multiline
                >
                  {org.description}
                </EditableText>
                <ul className="space-y-2 text-sm text-gray-600">
                  {org.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <EditableText
                        page="solutions"
                        path={`organizations[${index}].features[${fIndex}]`}
                      >
                        {feature}
                      </EditableText>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            page="solutions"
            path="cta.title"
            as="h2"
            className="text-4xl font-bold text-white mb-6"
          >
            {solutionsContent?.cta?.title || "Partner With Us"}
          </EditableText>
          <EditableText
            page="solutions"
            path="cta.description"
            as="p"
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            multiline
          >
            {solutionsContent?.cta?.description || "Discover how our integrated solutions can transform your healthcare organization."}
          </EditableText>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1e3a5f] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <EditableText page="solutions" path="cta.buttonText">
              {solutionsContent?.cta?.buttonText || "Schedule a Demo"}
            </EditableText>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
