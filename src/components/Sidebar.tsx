"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Vault, Shield, FileText, Users, Settings, LogOut, Activity } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <Shield className="logo-icon" size={28} />
          <span className="logo-text">Nominee Vault</span>
        </div>
      </div>
      
      <div className="sidebar-content">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
              <Vault size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/assets" className={`nav-link ${pathname === "/assets" ? "active" : ""}`}>
              <FileText size={20} />
              <span>Financial Assets</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/documents" className={`nav-link ${pathname === "/documents" ? "active" : ""}`}>
              <Shield size={20} />
              <span>Documents Vault</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/verification" className={`nav-link ${pathname === "/verification" ? "active" : ""}`}>
              <Activity size={20} />
              <span>Alive Verification</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/nominees" className={`nav-link ${pathname === "/nominees" ? "active" : ""}`}>
              <Users size={20} />
              <span>Nominees</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/settings" className={`nav-link ${pathname === "/settings" ? "active" : ""}`}>
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={() => signOut()}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
