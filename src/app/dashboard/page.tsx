"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { Shield, FileText, Users, Activity } from "lucide-react";
import "./page.css";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    assetCount: 0,
    nomineeCount: 0,
    documentCount: 0,
    status: "ACTIVE",
    lastVerification: null,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {}
  };

  const userName = session?.user?.name || "User";

  return (
    <AppLayout title="Dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2>Good evening, {userName.split(" ")[0]}</h2>
          <p className="welcome-subtitle">Your vault is secure and up to date</p>
        </div>
        <div className="vault-status">
          <div className={`status-badge ${stats.status === "ACTIVE" ? "active" : "warning"}`}>
            <span className="status-dot"></span>
            <span>Vault Status: {stats.status}</span>
          </div>
          <span className="sync-info">Last sync: Today, 10:45 AM</span>
        </div>
      </div>

      <div className="stats-overview">
        <div className="card stat-card">
          <div className="stat-top">
            <div className="stat-label">Financial Assets</div>
            <div className="stat-icon assets">
              <FileText size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.assetCount}</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-top">
            <div className="stat-label">Active Nominees</div>
            <div className="stat-icon nominees">
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.nomineeCount}</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-top">
            <div className="stat-label">Secure Documents</div>
            <div className="stat-icon activity">
              <Shield size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.documentCount}</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-top">
            <div className="stat-label">Vault Health</div>
            <div className="stat-icon health">
              <Activity size={18} />
            </div>
          </div>
          <div className="stat-value">92%</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card section-card">
          <div className="section-header">
            <h3 className="section-title">Recent Activity</h3>
            <button className="btn-ghost">View All</button>
          </div>
          
          <div className="activity-stack">
            <div className="activity-row">
              <div className="activity-mark blue"></div>
              <div className="activity-info">
                <p className="activity-text">Added Bank Account (HDFC)</p>
                <span className="activity-meta">2 hours ago</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-mark green"></div>
              <div className="activity-info">
                <p className="activity-text">Vault security scan completed</p>
                <span className="activity-meta">Yesterday</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-mark orange"></div>
              <div className="activity-info">
                <p className="activity-text">Priya Sharma added as Nominee</p>
                <span className="activity-meta">Oct 12, 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card health-card">
          <div className="section-header">
            <h3 className="section-title">Vault Health</h3>
          </div>
          
          <div className="health-status-container">
            <div className="health-percentage">85%</div>
            <div className="health-details">
              <p className="health-subtitle">Partially Secured</p>
              <p className="health-desc">Add a secondary nominee to reach 100%.</p>
            </div>
          </div>

          <div className="verification-cta">
            <span className="cta-text">Alive Verification due in 12 days</span>
            <button className="btn btn-primary w-full btn-sm" onClick={() => router.push("/verification")}>
              Verify Now
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
