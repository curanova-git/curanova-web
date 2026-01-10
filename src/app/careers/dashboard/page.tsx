"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCandidate } from "@/context/CandidateContext";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

export default function CandidateDashboard() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useCandidate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/careers/login?callbackUrl=/careers/dashboard");
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            Welcome back, {user?.name || user?.email?.split("@")[0]}!
          </h1>
          <p className="text-gray-600">
            Track your job applications and manage your profile.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-3xl font-bold text-[#14b8a6]">
              {applications.length}
            </div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-3xl font-bold text-yellow-500">
              {applications.filter((a) => a.status === "INTERVIEW").length}
            </div>
            <div className="text-gray-600">In Interview</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-3xl font-bold text-green-500">
              {applications.filter((a) => a.status === "OFFERED" || a.status === "ACCEPTED").length}
            </div>
            <div className="text-gray-600">Offers Received</div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e3a5f]">
              My Applications
            </h2>
            <Link
              href="/careers"
              className="text-[#14b8a6] hover:underline text-sm"
            >
              Browse Jobs →
            </Link>
          </div>

          {loadingApps ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
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
                  className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/careers/${app.job.id}`}
                        className="font-semibold text-[#1e3a5f] hover:text-[#14b8a6] transition-colors"
                      >
                        {app.job.title}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {app.job.department} • {app.job.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
