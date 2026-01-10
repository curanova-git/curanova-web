import type { Metadata } from "next";
import AdminWrapper from "@/components/admin/AdminWrapper";

export const metadata: Metadata = {
  title: "Admin | Curanova AI CMS",
  description: "Content Management System for Curanova AI",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
