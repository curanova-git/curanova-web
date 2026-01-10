"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useCandidate } from "@/context/CandidateContext";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  createdAt: string;
}

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { isAuthenticated } = useCandidate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/careers/jobs/${jobId}`);
      if (!res.ok) throw new Error("Job not found");
      const data = await res.json();
      setJob(data.job);
    } catch (err) {
      setError("Job not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-4">Job Not Found</h1>
          <Link href="/careers" className="text-[#14b8a6] hover:underline">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const requirements = job.requirements ? JSON.parse(job.requirements) : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/careers"
          className="text-[#14b8a6] hover:underline text-sm flex items-center gap-1 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">{job.title}</h1>
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
            <Link
              href={isAuthenticated ? `/careers/apply/${job.id}` : `/careers/login?callbackUrl=/careers/apply/${job.id}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-brand text-white rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">About This Role</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        {requirements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply CTA */}
        <div className="bg-gradient-brand rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-white/80 mb-6">
            {isAuthenticated
              ? "Click below to submit your application."
              : "Create an account or sign in to apply for this position."}
          </p>
          <Link
            href={isAuthenticated ? `/careers/apply/${job.id}` : `/careers/login?callbackUrl=/careers/apply/${job.id}`}
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1e3a5f] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            {isAuthenticated ? "Apply Now" : "Sign In to Apply"}
          </Link>
        </div>
      </div>
    </div>
  );
}
