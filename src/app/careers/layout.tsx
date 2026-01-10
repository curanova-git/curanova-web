import { CandidateProvider } from "@/context/CandidateContext";

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CandidateProvider>{children}</CandidateProvider>;
}
