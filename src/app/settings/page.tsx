"use client";

import { useSession } from "next-auth/react";
import AppLayout from "@/components/AppLayout";
import { Shield, Key, Eye, Edit3, Settings, Database, Server } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <AppLayout title="Security Settings">
      <div className="settings-container">
        <div className="section-header mb-6">
          <h2>Security & Encryption</h2>
          <p className="text-muted">Manage your encryption keys and security preferences.</p>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <Key size={20} className="header-icon" />
              <h4>Master Key Management</h4>
            </div>
            <p className="text-sm text-muted mt-2">Your master key is split into 3 parts: You, Your Nominee, and the System. All 3 are required for reconstruction.</p>
            <div className="key-parts mt-4">
              <div className="badge-success mb-2">System Part: Active</div>
              <div className="badge-success mb-2">User Part: Securely Stored</div>
              <div className="badge-warning mb-2">Nominee Part: Pending Sync</div>
            </div>
            <button className="btn btn-secondary btn-sm mt-4">Regenerate Master Key</button>
          </div>

          <div className="card">
            <div className="card-header">
              <Eye size={20} className="header-icon" />
              <h4>Privacy Settings</h4>
            </div>
            <div className="toggle-list mt-4">
              <div className="toggle-item flex justify-between align-center mb-4">
                <span>Hide Asset Values</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="toggle-item flex justify-between align-center">
                <span>Biometric Unlock</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-8">
          <div className="card-header">
            <Database size={20} className="header-icon" />
            <h4>Account & Data</h4>
          </div>
          <div className="mt-4">
            <button className="btn btn-secondary">Export Vault Metadata (PDF)</button>
            <button className="btn btn-error ml-4" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>Delete Vault & All Data</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
