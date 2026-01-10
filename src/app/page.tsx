"use client";

import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";

export default function Home() {
  const { content } = useAdmin();
  const homeContent = content?.home as {
    hero: {
      badge: string;
      headline: string;
      headlineHighlight: string;
      subheadline: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stats: Array<{ value: string; label: string }>;
    features: Array<{ title: string; description: string; icon: string }>;
    platforms: {
      title: string;
      titleHighlight: string;
      description: string;
      platform1: { title: string; description: string };
      platform2: { title: string; description: string };
    };
    cta: { title: string; description: string; buttonText: string };
  } | undefined;

  const featureIcons: Record<string, React.ReactNode> = {
    computer: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    dna: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    lock: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  };

  const stats = homeContent?.stats || [
    { value: "25+", label: "Clinical Specialties" },
    { value: "3B", label: "DNA Data Points" },
    { value: "99.9%", label: "Platform Uptime" },
    { value: "24/7", label: "AI Monitoring" },
  ];

  const features = homeContent?.features || [
    { title: "Clinical Intelligence", description: "AI-powered decision support that thinks alongside clinicians, delivering real-time insights and predictive analytics.", icon: "computer" },
    { title: "Precision Genomics", description: "Unlock the power of genomic data for personalized medicine, from pharmacogenomics to disease prevention.", icon: "dna" },
    { title: "Predictive Analytics", description: "Anticipate health events before they become emergencies with continuous monitoring and AI-driven alerts.", icon: "chart" },
    { title: "Privacy First", description: "Enterprise-grade security with pseudoanonymized architecture ensuring your data remains protected.", icon: "lock" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="absolute right-0 top-20 w-96 h-[600px] opacity-30">
          <DNAHelix className="h-full animate-float" />
        </div>
        <div className="absolute left-0 bottom-0 w-72 h-[400px] opacity-20">
          <DNAHelix className="h-full animate-float-delayed" />
        </div>

        {/* Floating DNA nucleotide decorations */}
        <div className="absolute top-40 left-20 w-4 h-4 rounded-full bg-[#14b8a6] opacity-40 animate-float" />
        <div className="absolute top-60 right-32 w-3 h-3 rounded-full bg-[#1e3a5f] opacity-30 animate-float-delayed" />
        <div className="absolute bottom-40 left-40 w-5 h-5 rounded-full bg-[#14b8a6] opacity-25 animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6] mr-2 animate-pulse" />
              <EditableText page="home" path="hero.badge">
                {homeContent?.hero?.badge || "Pioneering AI in Healthcare"}
              </EditableText>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <EditableText page="home" path="hero.headline" as="span" className="text-[#1e3a5f]">
                {homeContent?.hero?.headline || "The Future of"}
              </EditableText>
              <br />
              <EditableText page="home" path="hero.headlineHighlight" as="span" className="gradient-text">
                {homeContent?.hero?.headlineHighlight || "Healthcare Intelligence"}
              </EditableText>
            </h1>

            {/* Subheadline */}
            <EditableText
              page="home"
              path="hero.subheadline"
              as="p"
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
              multiline
            >
              {homeContent?.hero?.subheadline || "Transforming healthcare through AI-driven clinical intelligence and precision genomics. Empowering providers with predictive insights and actionable data."}
            </EditableText>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-brand text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#14b8a6]/20"
              >
                <EditableText page="home" path="hero.ctaPrimary">
                  {homeContent?.hero?.ctaPrimary || "Get Started"}
                </EditableText>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#1e3a5f] text-[#1e3a5f] rounded-full font-semibold text-lg hover:bg-[#1e3a5f] hover:text-white transition-all"
              >
                <EditableText page="home" path="hero.ctaSecondary">
                  {homeContent?.hero?.ctaSecondary || "Explore Solutions"}
                </EditableText>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <EditableText
                  page="home"
                  path={`stats[${index}].value`}
                  as="div"
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                >
                  {stat.value}
                </EditableText>
                <EditableText
                  page="home"
                  path={`stats[${index}].label`}
                  as="div"
                  className="text-[#14b8a6] font-medium"
                >
                  {stat.label}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">
              Intelligence That Transforms Care
            </h2>
            <p className="text-xl text-gray-600">
              Our integrated platform combines clinical AI with genomic insights to deliver
              precision healthcare at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 card-hover border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center text-white mb-6">
                  {featureIcons[feature.icon] || featureIcons.computer}
                </div>
                <EditableText
                  page="home"
                  path={`features[${index}].title`}
                  as="h3"
                  className="text-xl font-bold text-[#1e3a5f] mb-3"
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  page="home"
                  path={`features[${index}].description`}
                  as="p"
                  className="text-gray-600 leading-relaxed"
                  multiline
                >
                  {feature.description}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">
                <EditableText page="home" path="platforms.title">
                  {homeContent?.platforms?.title || "Two Platforms."}
                </EditableText>
                <br />
                <EditableText page="home" path="platforms.titleHighlight" as="span" className="gradient-text">
                  {homeContent?.platforms?.titleHighlight || "One Vision."}
                </EditableText>
              </h2>
              <EditableText
                page="home"
                path="platforms.description"
                as="p"
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                multiline
              >
                {homeContent?.platforms?.description || "We're building an integrated ecosystem that brings together clinical decision support and genomic intelligence to enable truly personalized medicine."}
              </EditableText>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <EditableText
                      page="home"
                      path="platforms.platform1.title"
                      as="h3"
                      className="text-lg font-semibold text-[#1e3a5f] mb-1"
                    >
                      {homeContent?.platforms?.platform1?.title || "Clinical Intelligence Platform"}
                    </EditableText>
                    <EditableText
                      page="home"
                      path="platforms.platform1.description"
                      as="p"
                      className="text-gray-600"
                    >
                      {homeContent?.platforms?.platform1?.description || "AI-powered EMR with predictive analytics and multi-specialty decision support."}
                    </EditableText>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <EditableText
                      page="home"
                      path="platforms.platform2.title"
                      as="h3"
                      className="text-lg font-semibold text-[#1e3a5f] mb-1"
                    >
                      {homeContent?.platforms?.platform2?.title || "Genomics as a Service"}
                    </EditableText>
                    <EditableText
                      page="home"
                      path="platforms.platform2.description"
                      as="p"
                      className="text-gray-600"
                    >
                      {homeContent?.platforms?.platform2?.description || "Comprehensive genomics ecosystem for personalized health insights."}
                    </EditableText>
                  </div>
                </div>
              </div>

              <Link
                href="/solutions"
                className="inline-flex items-center mt-10 text-[#14b8a6] font-semibold hover:underline"
              >
                Learn more about our solutions
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#1e3a5f] to-[#14b8a6] rounded-3xl p-1">
                <div className="bg-white rounded-3xl overflow-hidden">
                  <img
                    src="/images/ciaasandgenomics.png"
                    alt="Clinical Intelligence and Genomics Platform"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DNAHelix className="absolute right-0 top-0 h-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            page="home"
            path="cta.title"
            as="h2"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {homeContent?.cta?.title || "Ready to Transform Healthcare?"}
          </EditableText>
          <EditableText
            page="home"
            path="cta.description"
            as="p"
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            multiline
          >
            {homeContent?.cta?.description || "Join us in building the future of precision medicine. Let's discuss how Curanova AI can empower your healthcare organization."}
          </EditableText>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1e3a5f] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            <EditableText page="home" path="cta.buttonText">
              {homeContent?.cta?.buttonText || "Schedule a Consultation"}
            </EditableText>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
