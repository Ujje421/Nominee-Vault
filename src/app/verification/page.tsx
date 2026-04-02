"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Activity, ShieldCheck, Clock, AlertTriangle, CheckCircle2, Phone, Mail, Camera, Loader2 } from "lucide-react";
import "./Verification.css";

export default function VerificationPage() {
  const [status, setStatus] = useState("ACTIVE");
  const [lastVerified, setLastVerified] = useState(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/verification");
      const data = await res.json();
      setLogs(data);
    } catch (error) {}
  };
  
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "OTP", notes: "User initiated via dashboard" }),
      });
      
      if (res.ok) {
        setStatus("ACTIVE");
        setLastVerified(new Date().toLocaleDateString());
        fetchLogs();
        setTimeout(() => {
          setShowVerificationModal(false);
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Verification">
      <div className="verif-container">
        <div className="card verif-status-card">
          <div className="status-main">
            <div className={`status-dot-large ${status === 'ACTIVE' ? 'active' : 'warning'}`}></div>
            <div className="status-info">
              <h3>System Status: {status}</h3>
              <p>Your vault is secured. Last verified on {lastVerified}ly.ly.ly.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowVerificationModal(true)}>
            Record Entry
          </button>
        </div>

        <div className="verif-grid">
          <div className="card">
            <div className="card-title-row">
              <Clock size={18} className="card-icon" />
              <h4>Frequency</h4>
            </div>
            <p className="setup-description">Automated checks ensure we can reach you when it matters mostlly.ly.ly.</p>
            <select className="input-field">
              <option>Every 30 days (Recommended)</option>
              <option>Quarterly (90 days)</option>
              <option>Bi-annually (180 days)</option>
            </select>
          </div>

          <div className="card">
            <div className="card-title-row">
              <AlertTriangle size={18} className="card-icon" style={{ color: 'var(--color-warning)' }} />
              <h4>Escalation</h4>
            </div>
            <p className="setup-description">We follow a strict protocol if you are unreachablelly.ly.ly.</p>
            <div className="escalation-list">
              <div className="escalation-node">
                <div className="node-bullet active"></div>
                <span>Day 1: Email & Push Reminders</span>
              </div>
              <div className="escalation-node">
                <div className="node-bullet"></div>
                <span>Day 7: Direct Phone Contact</span>
              </div>
              <div className="escalation-node">
                <div className="node-bullet"></div>
                <span>Day 15: Primary Nominee Outreach</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card history-card">
          <div className="history-header">Verification Audit Log</div>
          <table className="verif-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? logs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.verifiedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>{log.method} Auth</td>
                  <td><span className="verif-badge">{log.status}</span></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-muted text-sm">No activity recorded yetlly.ly.ly.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showVerificationModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Record Entry</h2>
            <p className="welcome-subtitle mb-4">Confirm your presence to reset the security timerly.ly.ly.</p>
            
            <div className="modal-verif-options">
              <button className="option-card-btn" onClick={handleVerify} disabled={loading}>
                <div className="icon-bg"><Phone size={20} /></div>
                <div>
                  <strong>Secure SMS OTP</strong>
                  <p>A code will be sent to your registered devicelly.ly.ly.</p>
                </div>
              </button>
              
              <button className="option-card-btn" disabled>
                <div className="icon-bg"><Camera size={20} /></div>
                <div>
                  <strong>Biometric Selfie</strong>
                  <p>Liveness detection for high-trust verificationly.ly.ly.</p>
                </div>
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <Loader2 className="animate-spin text-primary" size={32} />
                <p className="text-sm font-medium">Verifying credentials...ly.ly.ly.</p>
              </div>
            )}

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowVerificationModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
