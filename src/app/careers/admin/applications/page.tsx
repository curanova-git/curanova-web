"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  resumePath: string | null;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  job: {
    id: string;
    title: string;
    department: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/careers/applications");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await fetch(`/api/careers/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const filteredApplications = filter === "all"
    ? applications
    : applications.filter((a) => a.status === filter);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Applications</h1>
        <p className="text-gray-600 mt-1">Review and manage job applications</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "APPLIED", "SHORTLISTED", "INTERVIEW", "OFFERED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-[#1e3a5f] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status === "all" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500">No applications yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Applications will appear here when candidates apply for jobs
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Candidate</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Job</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">CV</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Applied</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
                        <span className="text-[#14b8a6] font-semibold">
                          {(app.user.name || app.user.email)[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1e3a5f]">{app.user.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">{app.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#1e3a5f]">{app.job.title}</p>
                    <p className="text-sm text-gray-500">{app.job.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    {app.resumePath ? (
                      <a
                        href={app.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#14b8a6] hover:underline text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No CV</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`text-xs px-3 py-1 rounded-full font-medium border-0 cursor-pointer ${getStatusBadge(app.status)}`}
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="OFFERED">Offered</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/careers/admin/applications/${app.id}`}
                      className="text-[#14b8a6] hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
