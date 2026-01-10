import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Curanova AI",
  description: "Explore how Curanova AI's clinical intelligence and genomics solutions are transforming healthcare outcomes.",
};

export default function CaseStudiesPage() {
  const caseStudies = [
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
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Real-world examples of how our AI and genomics solutions are
              transforming healthcare delivery and patient outcomes.
            </p>
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
                    {study.status}
                  </span>
                </div>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm font-medium mb-4">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{study.title}</h3>
                  <p className="text-gray-600 mb-6">{study.description}</p>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">Expected Outcomes:</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {result}
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
          <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            We&apos;re actively seeking healthcare partners for our pilot programs.
            Join us in demonstrating the transformative power of AI and genomics
            in clinical settings.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-brand text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Become a Partner
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
            <h2 className="text-3xl font-bold text-white mb-4">Our Target Impact</h2>
            <p className="text-white/70">The outcomes we&apos;re working to achieve</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">30-50%</div>
              <div className="text-[#14b8a6]">Reduced ICU Transfers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">20-40%</div>
              <div className="text-[#14b8a6]">Lower Readmissions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4-8hr</div>
              <div className="text-[#14b8a6]">Faster Interventions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">25+</div>
              <div className="text-[#14b8a6]">Specialty AI Modules</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
