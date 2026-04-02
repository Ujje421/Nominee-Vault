import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./AppLayout.css";

export default function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
