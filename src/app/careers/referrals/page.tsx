"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCandidate } from "@/context/CandidateContext";

interface Referral {
  id: string;
  code: string;
  referredEmail: string | null;
  status: string;
  createdAt: string;
  completedAt: string | null;
  job: {
    id: string;
    title: string;
  } | null;
}

export default function ReferralsPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useCandidate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const [loadingReferrals, setLoadingReferrals] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/careers/login?callbackUrl=/careers/referrals");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReferrals();
    }
  }, [isAuthenticated]);

  const fetchReferrals = async () => {
    try {
      const res = await fetch("/api/careers/referrals");
      const data = await res.json();
      setReferrals(data.referrals || []);
      if (data.referralCode) {
        setReferralCode(data.referralCode);
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
    } finally {
      setLoadingReferrals(false);
    }
  };

  const generateReferralCode = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/careers/referrals", {
        method: "POST",
      });
      const data = await res.json();
      if (data.code) {
        setReferralCode(data.code);
      }
    } catch (error) {
      console.error("Error generating referral code:", error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const referralUrl = `${window.location.origin}/careers?ref=${referralCode}`;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
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

  const completedReferrals = referrals.filter((r) => r.status === "COMPLETED").length;

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
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Referrals</h1>
          <p className="text-gray-600">
            Share your referral link and help talented people join Curanova AI.
          </p>
        </div>

        {/* Referral Code Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">
            Your Referral Link
          </h2>

          {referralCode ? (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 p-4 bg-gray-50 rounded-xl font-mono text-sm break-all">
                  {`${typeof window !== "undefined" ? window.location.origin : ""}/careers?ref=${referralCode}`}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-[#14b8a6] text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Share this link with friends. When they apply using your link,
                you&apos;ll earn referral credit.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Generate your unique referral code to start referring candidates.
              </p>
              <button
                onClick={generateReferralCode}
                disabled={generating}
                className="px-6 py-3 bg-[#14b8a6] text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {generating ? "Generating..." : "Generate Referral Code"}
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-3xl font-bold text-[#14b8a6]">
              {referrals.length}
            </div>
            <div className="text-gray-600">Total Referrals</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-3xl font-bold text-green-500">
              {completedReferrals}
            </div>
            <div className="text-gray-600">Successful Applications</div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-6">
            Referral History
          </h2>

          {loadingReferrals ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
            </div>
          ) : referrals.length === 0 ? (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 mb-4">
                No referrals yet. Share your link to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-[#1e3a5f]">
                        {referral.referredEmail || "Anonymous Referral"}
                      </p>
                      {referral.job && (
                        <p className="text-sm text-gray-500">
                          Applied for: {referral.job.title}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          referral.status
                        )}`}
                      >
                        {referral.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(referral.createdAt).toLocaleDateString()}
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
