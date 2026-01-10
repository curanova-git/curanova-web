"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

interface Application {
  id: string;
  status: string;
  coverLetter: string | null;
  resumePath: string | null;
  referralCode: string | null;
  rating: number | null;
  notes: string | null;
  appliedAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    linkedInUrl: string | null;
    portfolioUrl: string | null;
    bio: string | null;
  };
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

const STATUS_OPTIONS = [
  { value: "APPLIED", label: "Applied", color: "bg-blue-100 text-blue-800" },
  { value: "SHORTLISTED", label: "Shortlisted", color: "bg-yellow-100 text-yellow-800" },
  { value: "INTERVIEW", label: "Interview", color: "bg-purple-100 text-purple-800" },
  { value: "OFFERED", label: "Offered", color: "bg-green-100 text-green-800" },
  { value: "ACCEPTED", label: "Accepted", color: "bg-green-200 text-green-900" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-800" },
];

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [status, setStatus] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`/api/careers/applications/${id}`);
      if (!res.ok) throw new Error("Application not found");
      const data = await res.json();
      setApplication(data.application);
      setStatus(data.application.status);
      setRating(data.application.rating);
      setNotes(data.application.notes || "");
    } catch (err) {
      setError("Application not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/careers/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rating, notes }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setSuccess("Application updated successfully");
      setTimeout(() => setSuccess(""), 3000);
      fetchApplication();
    } catch (err) {
      setError("Failed to update application");
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (statusValue: string) => {
    return STATUS_OPTIONS.find((s) => s.value === statusValue)?.color || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-4">Application Not Found</h1>
          <Link href="/careers/admin/applications" className="text-[#14b8a6] hover:underline">
            ← Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  if (!application) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/careers/admin/applications"
            className="text-[#14b8a6] hover:underline text-sm flex items-center gap-1 mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Applications
          </Link>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Application Details</h1>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Candidate Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Candidate Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#14b8a6] flex items-center justify-center text-white text-2xl font-bold">
                  {application.user.name?.charAt(0) || application.user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1e3a5f]">
                    {application.user.name || "No Name"}
                  </h3>
                  <p className="text-gray-600">{application.user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                {application.user.phone && (
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <p className="text-[#1e3a5f]">{application.user.phone}</p>
                  </div>
                )}
                {application.user.linkedInUrl && (
                  <div>
                    <span className="text-sm text-gray-500">LinkedIn</span>
                    <p>
                      <a
                        href={application.user.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#14b8a6] hover:underline"
                      >
                        View Profile
                      </a>
                    </p>
                  </div>
                )}
                {application.user.portfolioUrl && (
                  <div>
                    <span className="text-sm text-gray-500">Portfolio</span>
                    <p>
                      <a
                        href={application.user.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#14b8a6] hover:underline"
                      >
                        View Portfolio
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {application.user.bio && (
                <div className="pt-4 border-t">
                  <span className="text-sm text-gray-500">About</span>
                  <p className="text-gray-700 mt-1">{application.user.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Applied Position</h2>
            <div>
              <Link
                href={`/careers/admin/jobs/${application.job.id}/edit`}
                className="text-xl font-semibold text-[#14b8a6] hover:underline"
              >
                {application.job.title}
              </Link>
              <p className="text-gray-600 mt-1">
                {application.job.department} • {application.job.location}
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Cover Letter</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
            </div>
          )}

          {/* Resume */}
          {application.resumePath && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Resume</h2>
              <a
                href={application.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-[#1e3a5f] hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          )}
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Update Application</h2>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        rating && rating >= star ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    >
                      ★
                    </button>
                  ))}
                  {rating && (
                    <button
                      type="button"
                      onClick={() => setRating(null)}
                      className="text-sm text-gray-500 hover:text-red-500 ml-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none resize-none"
                  placeholder="Add notes about this candidate..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2 bg-[#14b8a6] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Applied</span>
                <span className="text-[#1e3a5f]">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Updated</span>
                <span className="text-[#1e3a5f]">
                  {new Date(application.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {application.referralCode && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Referral Code</span>
                  <span className="text-[#14b8a6] font-mono">{application.referralCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
