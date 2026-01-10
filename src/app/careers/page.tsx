"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DNAHelix from "@/components/DNAHelix";
import EditableText from "@/components/admin/EditableText";
import { useAdmin } from "@/context/AdminContext";
import { useCandidate } from "@/context/CandidateContext";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface Application {
  id: string;
  jobId: string;
  status: string;
}

export default function CareersPage() {
  const { content } = useAdmin();
  const { user, isAuthenticated } = useCandidate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const careersContent = content?.careers as {
    hero: { title: string; titleHighlight: string; description: string };
    benefits: Array<{ title: string; description: string }>;
  } | undefined;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/careers/jobs");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/careers/applications");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const getApplicationStatus = (jobId: string) => {
    const app = applications.find(a => a.jobId === jobId);
    return app ? app.status : null;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      APPLIED: "bg-blue-100 text-blue-600",
      SHORTLISTED: "bg-yellow-100 text-yellow-600",
      INTERVIEW: "bg-purple-100 text-purple-600",
      REJECTED: "bg-red-100 text-red-600",
      OFFERED: "bg-green-100 text-green-600",
      ACCEPTED: "bg-emerald-100 text-emerald-600",
    };
    return styles[status] || styles.APPLIED;
  };

  const benefitIcons = [
    <svg key="heart" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    <svg key="globe" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="growth" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>,
    <svg key="tech" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
  ];

  const benefits = careersContent?.benefits || [
    { title: "Meaningful Work", description: "Make a real impact on healthcare and patient outcomes." },
    { title: "Remote-First", description: "Work from anywhere with flexible schedules." },
    { title: "Growth & Learning", description: "Continuous learning opportunities and career development." },
    { title: "Cutting-Edge Tech", description: "Work with the latest AI, genomics, and cloud technologies." },
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
              <EditableText page="careers" path="hero.title">
                {careersContent?.hero?.title || "Join Our"}
              </EditableText>{" "}
              <EditableText page="careers" path="hero.titleHighlight" as="span" className="gradient-text">
                {careersContent?.hero?.titleHighlight || "Mission"}
              </EditableText>
            </h1>
            <EditableText
              page="careers"
              path="hero.description"
              as="p"
              className="text-xl text-gray-600 leading-relaxed"
              multiline
            >
              {careersContent?.hero?.description || "Help us transform healthcare through AI and genomics. We're looking for passionate individuals who want to make a difference."}
            </EditableText>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6">
              Why Curanova AI?
            </h2>
            <p className="text-xl text-gray-600">
              Join a team that&apos;s building the future of healthcare technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 card-hover text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-6">
                  {benefitIcons[index]}
                </div>
                <EditableText
                  page="careers"
                  path={`benefits[${index}].title`}
                  as="h3"
                  className="text-xl font-bold text-[#1e3a5f] mb-3"
                >
                  {benefit.title}
                </EditableText>
                <EditableText
                  page="careers"
                  path={`benefits[${index}].description`}
                  as="p"
                  className="text-gray-600"
                >
                  {benefit.description}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Banner - Show when logged in */}
      {isAuthenticated && user && (
        <section className="bg-gradient-brand py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-semibold">{(user.name || user.email)[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium">Welcome, {user.name || user.email}</p>
                  <p className="text-sm text-white/80">
                    {applications.length} application{applications.length !== 1 ? 's' : ''} submitted
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/careers/applications"
                  className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                >
                  My Applications
                </Link>
                <Link
                  href="/careers/dashboard"
                  className="px-4 py-2 bg-white text-[#1e3a5f] rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Open Positions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity with us.
            </p>
          </div>

          {loadingJobs ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No open positions at the moment. Check back later!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => {
                const status = getApplicationStatus(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-8 border border-gray-100 card-hover"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/careers/${job.id}`}
                            className="text-xl font-bold text-[#1e3a5f] hover:text-[#14b8a6] transition-colors"
                          >
                            {job.title}
                          </Link>
                          {status && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(status)}`}>
                              {status.charAt(0) + status.slice(1).toLowerCase()}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm">
                            {job.location}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      {status ? (
                        <Link
                          href="/careers/applications"
                          className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#14b8a6] text-[#14b8a6] rounded-full font-semibold hover:bg-[#14b8a6]/10 transition-colors whitespace-nowrap"
                        >
                          View Application
                        </Link>
                      ) : (
                        <Link
                          href={`/careers/apply/${job.id}`}
                          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-brand text-white rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                          Apply Now
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6">
                Our Culture
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                We believe in building a diverse, inclusive team where everyone
                can do their best work. Our culture is built on collaboration,
                continuous learning, and a shared passion for improving healthcare.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Collaborative and supportive team environment</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Focus on innovation and continuous improvement</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Work-life balance and flexible arrangements</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Direct impact on healthcare outcomes</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#1e3a5f]/5 to-[#14b8a6]/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-4">100+</div>
                  <p className="text-gray-600 text-lg">Healthcare Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            We&apos;re always looking for talented people. Send us your resume and
            let us know how you can contribute.
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
