"use client";

import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";

export default function AboutPage() {
  const { content } = useAdmin();
  const aboutContent = content?.about as {
    hero: { title: string; titleHighlight: string; description: string };
    mission: { title: string; content: string; additionalContent: string };
    vision: { title: string; content: string };
    values: Array<{ title: string; description: string }>;
    team: Array<{ role: string; experience: string }>;
  } | undefined;

  const valueIcons = [
    <svg key="innovation" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    <svg key="precision" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="privacy" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>,
    <svg key="accessibility" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  const values = aboutContent?.values || [
    { title: "Innovation", description: "Pushing the boundaries of what's possible in healthcare AI and genomics." },
    { title: "Precision", description: "Delivering accurate, evidence-based insights that clinicians can trust." },
    { title: "Privacy", description: "Protecting patient data with the highest standards of security and ethics." },
    { title: "Accessibility", description: "Making precision medicine available to healthcare providers everywhere." },
  ];

  const team = aboutContent?.team || [
    { role: "Emergency Medicine & Genomics", experience: "20+ years clinical experience" },
    { role: "AI Architecture", experience: "35+ years in AI/ML systems" },
    { role: "Genomics & Research", experience: "40+ years in molecular biology" },
    { role: "Digital Innovation", experience: "AI entrepreneurship leader" },
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
              <EditableText page="about" path="hero.title">
                {aboutContent?.hero?.title || "About"}
              </EditableText>{" "}
              <EditableText page="about" path="hero.titleHighlight" as="span" className="gradient-text">
                {aboutContent?.hero?.titleHighlight || "Curanova AI"}
              </EditableText>
            </h1>
            <EditableText
              page="about"
              path="hero.description"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {aboutContent?.hero?.description || "We're on a mission to transform healthcare through the power of artificial intelligence and precision genomics."}
            </EditableText>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText page="about" path="mission.title" as="h2" className="text-4xl font-bold text-[#1e3a5f] mb-6">
                {aboutContent?.mission?.title || "Our Mission"}
              </EditableText>
              <EditableText
                page="about"
                path="mission.content"
                as="p"
                className="text-xl text-gray-600 mb-6 leading-relaxed"
                multiline
              >
                {aboutContent?.mission?.content || "To build the world's most advanced AI-driven clinical intelligence ecosystem that transforms healthcare delivery through precision diagnostics, predictive analytics, and actionable medical intelligence."}
              </EditableText>
              <EditableText
                page="about"
                path="mission.additionalContent"
                as="p"
                className="text-lg text-gray-600 leading-relaxed"
                multiline
              >
                {aboutContent?.mission?.additionalContent || "We believe that every patient deserves access to the best possible care, informed by the latest medical research and personalized to their unique genetic profile. Our platforms empower healthcare providers with the intelligence they need to deliver truly personalized medicine."}
              </EditableText>
            </div>

            <div className="relative">
              <img
                src="/images/our_mission.png"
                alt="Our Mission"
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <EditableText page="about" path="vision.title" as="h2" className="text-4xl font-bold text-[#1e3a5f] mb-6">
              {aboutContent?.vision?.title || "Our Vision"}
            </EditableText>
            <EditableText
              page="about"
              path="vision.content"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {aboutContent?.vision?.content || "A world where every healthcare decision is informed by AI-powered intelligence and personalized genetic insights, enabling preventive care and optimal outcomes for all."}
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#1e3a5f] flex items-center justify-center text-white mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <EditableText
                page="about"
                path="visionCards[0].title"
                as="h3"
                className="text-2xl font-bold text-[#1e3a5f] mb-4"
              >
                {(content?.about as { visionCards?: Array<{ title: string; description: string }> })?.visionCards?.[0]?.title || "Clinical Intelligence"}
              </EditableText>
              <EditableText
                page="about"
                path="visionCards[0].description"
                as="p"
                className="text-gray-600 leading-relaxed"
                multiline
              >
                {(content?.about as { visionCards?: Array<{ title: string; description: string }> })?.visionCards?.[0]?.description || "We're building AI that thinks alongside clinicians, providing real-time decision support across all medical specialties. Our platform predicts patient deterioration, suggests optimal treatments, and continuously learns from outcomes."}
              </EditableText>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#14b8a6] flex items-center justify-center text-white mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <EditableText
                page="about"
                path="visionCards[1].title"
                as="h3"
                className="text-2xl font-bold text-[#1e3a5f] mb-4"
              >
                {(content?.about as { visionCards?: Array<{ title: string; description: string }> })?.visionCards?.[1]?.title || "Precision Genomics"}
              </EditableText>
              <EditableText
                page="about"
                path="visionCards[1].description"
                as="p"
                className="text-gray-600 leading-relaxed"
                multiline
              >
                {(content?.about as { visionCards?: Array<{ title: string; description: string }> })?.visionCards?.[1]?.description || "Our genomics platform transforms complex genetic data into actionable health insights. From pharmacogenomics to disease prevention, we make precision medicine accessible and practical for everyday clinical use."}
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <EditableText
              page="about"
              path="valuesSection.title"
              as="h2"
              className="text-4xl font-bold text-[#1e3a5f] mb-6"
            >
              {(content?.about as { valuesSection?: { title: string; description: string } })?.valuesSection?.title || "Our Values"}
            </EditableText>
            <EditableText
              page="about"
              path="valuesSection.description"
              as="p"
              className="text-xl text-gray-600"
            >
              {(content?.about as { valuesSection?: { title: string; description: string } })?.valuesSection?.description || "The principles that guide everything we do."}
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-6">
                  {valueIcons[index]}
                </div>
                <EditableText
                  page="about"
                  path={`values[${index}].title`}
                  as="h3"
                  className="text-xl font-bold text-[#1e3a5f] mb-3"
                >
                  {value.title}
                </EditableText>
                <EditableText
                  page="about"
                  path={`values[${index}].description`}
                  as="p"
                  className="text-gray-600"
                >
                  {value.description}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <EditableText
              page="about"
              path="teamSection.title"
              as="h2"
              className="text-4xl font-bold text-[#1e3a5f] mb-6"
            >
              {(content?.about as { teamSection?: { title: string; description: string } })?.teamSection?.title || "Leadership Team"}
            </EditableText>
            <EditableText
              page="about"
              path="teamSection.description"
              as="p"
              className="text-xl text-gray-600"
              multiline
            >
              {(content?.about as { teamSection?: { title: string; description: string } })?.teamSection?.description || "Experienced leaders in healthcare, AI, and genomics working together to transform medicine."}
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 text-center card-hover"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#14b8a6] mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <EditableText
                  page="about"
                  path={`team[${index}].role`}
                  as="h3"
                  className="text-lg font-bold text-[#1e3a5f] mb-2"
                >
                  {member.role}
                </EditableText>
                <EditableText
                  page="about"
                  path={`team[${index}].experience`}
                  as="p"
                  className="text-sm text-gray-500"
                >
                  {member.experience}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            page="about"
            path="cta.title"
            as="h2"
            className="text-4xl font-bold text-white mb-6"
          >
            {(content?.about as { cta?: { title: string; description: string; buttonText1: string; buttonText2: string } })?.cta?.title || "Join Our Mission"}
          </EditableText>
          <EditableText
            page="about"
            path="cta.description"
            as="p"
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            multiline
          >
            {(content?.about as { cta?: { title: string; description: string; buttonText1: string; buttonText2: string } })?.cta?.description || "We're always looking for talented individuals who share our passion for transforming healthcare."}
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1e3a5f] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <EditableText page="about" path="cta.buttonText1">
                {(content?.about as { cta?: { title: string; description: string; buttonText1: string; buttonText2: string } })?.cta?.buttonText1 || "View Careers"}
              </EditableText>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              <EditableText page="about" path="cta.buttonText2">
                {(content?.about as { cta?: { title: string; description: string; buttonText1: string; buttonText2: string } })?.cta?.buttonText2 || "Contact Us"}
              </EditableText>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
