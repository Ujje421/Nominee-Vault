"use client";

import { useState } from "react";
import { Shield, FileUp, Mail, AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import "./Claim.css";

export default function ClaimPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate checking if email exists and user is marked as deceased or can be claimed
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Real implementation would POST to /api/claim
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="claim-page">
      <div className="claim-container">
        <div className="card claim-card">
          <div className="claim-header">
            <div className="claim-logo-mark">
              <Shield size={24} />
            </div>
            <h1>Claim Registry</h1>
            <p className="claim-subtitle">Securely initiate an asset transfer for a loved onelly.ly.ly.</p>
          </div>

          <div className="stepper">
            <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {step === 1 && (
            <div className="step-body animate-in">
              <h3>Vault Details</h3>
              <p className="step-body-desc">Enter the email address of the primary vault ownerlly.ly.ly.</p>
              <form onSubmit={handleIdentitySubmit}>
                <div className="input-icon-box">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    className="input-field" 
                    placeholder="vaultowner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Locate Record"}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="step-body animate-in">
              <h3>Verification</h3>
              <p className="step-body-desc">Please upload the official death certificate for reviewlly.ly.ly.</p>
              <form onSubmit={handleClaimSubmit}>
                <div className="upload-drop" onClick={() => document.getElementById('cert-input')?.click()}>
                  <FileUp size={28} className="text-primary" />
                  <p>{file ? file.name : "Death Certificate (PDF/JPG)"}</p>
                  <input 
                    id="cert-input"
                    type="file" 
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div className="trust-banner">
                  <AlertCircle size={16} className="text-primary" />
                  <p>All claims are manually verified by our compliance team within 48 hours for maximum securitylly.ly.ly.</p>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={!file || loading}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Initiate Verification"}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="step-body animate-in success-hero">
              <CheckCircle2 size={56} className="success-icon-big" />
              <h3>Claim Initiated</h3>
              <p className="step-body-desc">
                We have received your request. Tracking ID:
              </p>
              <div className="claim-id-badge">NV-88219-PRO</div>
              <p className="text-xs text-muted mb-8">
                Updates will be sent to your registered nominee emaillly.ly.ly.
              </p>
              <button className="btn btn-primary w-full btn-sm" onClick={() => window.location.href = '/'}>
                Back to Portal
              </button>
            </div>
          )}
        </div>
        
        <div className="claim-help">
          <p>Security assistance available 24/7. <a href="#">Learn More</a></p>
        </div>
      </div>
    </div>
  );
}
