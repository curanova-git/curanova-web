"use client";

import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  provider: string;
  createdAt: string;
  _count: {
    applications: number;
  };
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch("/api/careers/candidates");
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "G";
      case "linkedin":
        return "in";
      case "facebook":
        return "f";
      default:
        return "@";
    }
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
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Candidates</h1>
        <p className="text-gray-600 mt-1">All registered candidates</p>
      </div>

      {/* Candidates List */}
      {candidates.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500">No candidates yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Candidates will appear here when they register on the careers portal
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Candidate</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Provider</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Applications</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
                        <span className="text-[#14b8a6] font-semibold">
                          {(candidate.name || candidate.email)[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1e3a5f]">{candidate.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">{candidate.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate.phone || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                      {getProviderIcon(candidate.provider)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate._count.applications}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(candidate.createdAt).toLocaleDateString()}
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
