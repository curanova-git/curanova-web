"use client";

import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

interface IndustryItem {
  name: string;
  description: string;
}

export default function ServicesPage() {
  const { content } = useAdmin();
  const servicesContent = content?.services as {
    hero: { title: string; titleHighlight: string; description: string };
    servicesList: ServiceItem[];
    industries: IndustryItem[];
  } | undefined;

  const serviceIcons: Record<string, React.ReactNode> = {
    clinical: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    genomics: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    analytics: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

  const industryIcons = [
    <svg key="hospital" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    <svg key="research" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    <svg key="wellness" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    <svg key="corporate" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
  ];

  const services = servicesContent?.servicesList || [
    {
      id: "clinical",
      title: "Clinical Intelligence",
      subtitle: "AI-Powered Decision Support",
      description: "Our intelligent clinical platform thinks alongside healthcare providers, delivering real-time insights, predictive analytics, and evidence-based recommendations across multiple specialties.",
      features: ["Real-time clinical decision support", "Predictive patient monitoring", "Multi-specialty AI modules", "Integrated workflow optimization"],
    },
    {
      id: "genomics",
      title: "Genomics Services",
      subtitle: "Precision Medicine Platform",
      description: "Comprehensive genomics ecosystem that transforms genetic data into actionable health insights. From sequencing to interpretation, we make precision medicine accessible.",
      features: ["Advanced genomic analysis", "Pharmacogenomics insights", "Disease risk assessment", "Personalized health recommendations"],
    },
    {
      id: "analytics",
      title: "Predictive Analytics",
      subtitle: "Anticipate, Don't React",
      description: "Advanced AI algorithms that analyze patient data patterns to predict health events before they become emergencies. Move from reactive to proactive healthcare.",
      features: ["Early warning systems", "Risk stratification", "Outcome prediction", "Population health insights"],
    },
  ];

  const industries = servicesContent?.industries || [
    { name: "Hospitals & Health Systems", description: "Enterprise-scale clinical intelligence for improved patient outcomes." },
    { name: "Research Institutions", description: "Accelerate genomic research with advanced analytics and data management." },
    { name: "Wellness & Lifestyle", description: "Personalized health optimization through genomic and clinical insights." },
    { name: "Corporate Health", description: "Employee wellness programs powered by advanced health analytics." },
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
              <EditableText page="services" path="hero.title">
                {servicesContent?.hero?.title || "Our"}
              </EditableText>{" "}
              <EditableText page="services" path="hero.titleHighlight" as="span" className="gradient-text">
                {servicesContent?.hero?.titleHighlight || "Services"}
              </EditableText>
            </h1>
            <EditableText
              page="services"
              path="hero.description"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {servicesContent?.hero?.description || "Comprehensive AI-powered healthcare solutions designed to transform clinical decision-making and unlock the power of precision medicine."}
            </EditableText>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mb-6">
                    {serviceIcons[service.id] || serviceIcons.clinical}
                  </div>
                  <EditableText
                    page="services"
                    path={`servicesList[${index}].subtitle`}
                    as="p"
                    className="text-[#14b8a6] font-semibold mb-2"
                  >
                    {service.subtitle}
                  </EditableText>
                  <EditableText
                    page="services"
                    path={`servicesList[${index}].title`}
                    as="h2"
                    className="text-4xl font-bold text-[#1e3a5f] mb-4"
                  >
                    {service.title}
                  </EditableText>
                  <EditableText
                    page="services"
                    path={`servicesList[${index}].description`}
                    as="p"
                    className="text-lg text-gray-600 mb-8 leading-relaxed"
                    multiline
                  >
                    {service.description}
                  </EditableText>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <EditableText
                          page="services"
                          path={`servicesList[${index}].features[${i}]`}
                          as="span"
                          className="text-gray-700"
                        >
                          {feature}
                        </EditableText>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/solutions#${service.id}`}
                    className="inline-flex items-center text-[#14b8a6] font-semibold hover:underline"
                  >
                    Learn more
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  {service.id === "clinical" ? (
                    <img
                      src="/images/clinical_intelligence_dss.png"
                      alt="Clinical Intelligence"
                      className="w-full h-auto rounded-3xl"
                    />
                  ) : service.id === "genomics" ? (
                    <img
                      src="/images/genomics_services.png"
                      alt="Genomics Services"
                      className="w-full h-auto rounded-3xl"
                    />
                  ) : service.id === "analytics" ? (
                    <img
                      src="/images/predictive_analytics.png"
                      alt="Predictive Analytics"
                      className="w-full h-auto rounded-3xl"
                    />
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-[#1e3a5f]/5 to-[#14b8a6]/10 rounded-3xl flex items-center justify-center">
                      <div className="w-2/3 h-2/3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                        <div className="text-[#14b8a6] opacity-30">
                          {serviceIcons[service.id] || serviceIcons.clinical}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Our solutions are designed to meet the unique needs of various healthcare
              and wellness sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 card-hover border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center text-[#14b8a6] mb-6">
                  {industryIcons[index]}
                </div>
                <EditableText
                  page="services"
                  path={`industries[${index}].name`}
                  as="h3"
                  className="text-xl font-bold text-[#1e3a5f] mb-3"
                >
                  {industry.name}
                </EditableText>
                <EditableText
                  page="services"
                  path={`industries[${index}].description`}
                  as="p"
                  className="text-gray-600"
                >
                  {industry.description}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how our services can transform your healthcare delivery.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1e3a5f] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
