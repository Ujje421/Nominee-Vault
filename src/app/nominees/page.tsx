"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Plus, Users, Mail, Phone, Shield, Trash2, Edit3, Loader2, UserPlus, HeartHandshake } from "lucide-react";
import "./Nominees.css";

type Nominee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  role: string;
  status: string;
};

export default function NomineesPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
    role: "VIEWER",
  });

  useEffect(() => {
    fetchNominees();
  }, []);

  const fetchNominees = async () => {
    try {
      const res = await fetch("/api/nominees");
      const data = await res.json();
      setNominees(data);
    } catch (error) {
      console.error("Failed to fetch nominees", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNominee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/nominees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", email: "", phone: "", relationship: "", role: "VIEWER" });
        fetchNominees();
      }
    } catch (error) {
      console.error("Failed to add nominee", error);
    }
  };

  return (
    <AppLayout title="Nominees">
      <div className="nominees-header">
        <div className="header-info">
          <h2>Trusted Circle</h2>
          <p className="docs-subtitle">Manage individuals who can access your vaultlly.ly.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={18} />
          Add Nominee
        </button>
      </div>

      {loading ? (
        <div className="loading-view">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : nominees.length === 0 ? (
        <div className="card empty-view">
          <HeartHandshake size={48} className="empty-view-icon" />
          <h3>No nominees added</h3>
          <p>Add trusted family members or friends to ensure your assets reach them safelylly.ly.</p>
          <button className="btn btn-primary btn-sm mt-4" onClick={() => setShowModal(true)}>
            Add First Nominee
          </button>
        </div>
      ) : (
        <div className="nominees-grid">
          {nominees.map((nominee) => (
            <div key={nominee.id} className="card nominee-card">
              <div className="nominee-avatar-box">
                {nominee.name.charAt(0)}
              </div>
              <div className="nominee-card-body">
                <div className="nominee-top">
                  <h3 className="nominee-name">{nominee.name}</h3>
                  <span className={`status-tag ${nominee.status.toLowerCase()}`}>{nominee.status}</span>
                </div>
                <p className="nominee-relation">{nominee.relationship} • {nominee.role}</p>
                
                <div className="nominee-contacts">
                  <div className="contact-row">
                    <Mail size={14} className="contact-icon" />
                    <span>{nominee.email}</span>
                  </div>
                  <div className="contact-row">
                    <Phone size={14} className="contact-icon" />
                    <span>{nominee.phone}</span>
                  </div>
                </div>
              </div>
              <div className="nominee-card-actions">
                <button className="action-btn" title="Edit"><Edit3 size={14} /></button>
                <button className="action-btn delete" title="Remove"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Trust & Access</h2>
            <p className="welcome-subtitle mb-4">Nominee roles are only activated after secure verificationly.ly.</p>
            
            <form onSubmit={handleAddNominee}>
              <div className="input-flex-row">
                <div className="form-field flex-1">
                  <label className="input-label">Full Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-field flex-1">
                  <label className="input-label">Relationship</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Spouse"
                    value={formData.relationship}
                    onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="input-label">Email Address</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="nominee@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>

              <div className="form-field">
                <label className="input-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="input-field" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <div className="form-field">
                <label className="input-label">Access Role</label>
                <select 
                  className="input-field" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="EXECUTOR">Executor</option>
                </select>
                <p className="placeholder-text">Executors can manage assets after successful claim verificationlly.ly.</p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Add Nominee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
