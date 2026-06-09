import React from "react";

export const metadata = {
  title: "Admin Dashboard — Pizza",
  description: "Admin control panel for managing orders, menu, and analytics.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
