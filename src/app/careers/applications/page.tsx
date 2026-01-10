"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCandidate } from "@/context/CandidateContext";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  coverLetter: string | null;
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useCandidate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/careers/login?callbackUrl=/careers/applications");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/careers/applications");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoadingApps(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-800";
      case "SHORTLISTED":
        return "bg-yellow-100 text-yellow-800";
      case "INTERVIEW":
        return "bg-purple-100 text-purple-800";
      case "OFFERED":
        return "bg-green-100 text-green-800";
      case "ACCEPTED":
        return "bg-green-200 text-green-900";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "Your application is being reviewed";
      case "SHORTLISTED":
        return "You've been shortlisted for the next stage";
      case "INTERVIEW":
        return "Interview scheduled - check your email for details";
      case "OFFERED":
        return "Congratulations! You have received an offer";
      case "ACCEPTED":
        return "You have accepted the offer";
      case "REJECTED":
        return "Unfortunately, we've moved forward with other candidates";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/careers" className="text-2xl font-bold">
            <span className="text-[#1e3a5f]">Curanova</span>
            <span className="text-[#14b8a6]">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/careers/dashboard"
              className="text-gray-600 hover:text-[#14b8a6] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/careers/profile"
              className="text-gray-600 hover:text-[#14b8a6] transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track the status of your job applications.
          </p>
        </div>

        {loadingApps ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 mb-4">
              You haven&apos;t applied to any jobs yet.
            </p>
            <Link
              href="/careers"
              className="inline-block px-6 py-3 bg-[#14b8a6] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Browse Open Positions
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/careers/${app.job.id}`}
                        className="text-lg font-semibold text-[#1e3a5f] hover:text-[#14b8a6] transition-colors"
                      >
                        {app.job.title}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {app.job.department} • {app.job.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Description */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {getStatusDescription(app.status)}
                    </p>
                  </div>

                  {/* Cover Letter Preview */}
                  {app.coverLetter && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Your Cover Letter
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {app.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
