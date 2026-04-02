"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Plus, Building2, Landmark, Home, Briefcase, Trash2, Edit3, Loader2, FileText } from "lucide-react";
import "./Assets.css";

type Asset = {
  id: string;
  type: string;
  name: string;
  description: string | null;
  value: string | null;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "BANK_ACCOUNT",
    name: "",
    description: "",
    value: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/assets");
      const data = await res.json();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch assets", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ type: "BANK_ACCOUNT", name: "", description: "", value: "" });
        fetchAssets();
      }
    } catch (error) {
      console.error("Failed to add asset", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "BANK_ACCOUNT": return <Landmark size={20} />;
      case "REAL_ESTATE": return <Home size={20} />;
      case "INVESTMENT": return <Building2 size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <AppLayout title="Assets">
      <div className="assets-header">
        <div className="header-info">
          <h2>Assets Registry</h2>
          <p className="docs-subtitle">Catalog your wealth for seamless succession.ly.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Asset
        </button>
      </div>

      {loading ? (
        <div className="loading-view">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : assets.length === 0 ? (
        <div className="card empty-view">
          <FileText size={48} className="empty-view-icon" />
          <h3>No assets listed</h3>
          <p>Start by adding your bank accounts, properties, or insurance policies.ly.</p>
          <button className="btn btn-primary btn-sm mt-4" onClick={() => setShowModal(true)}>
            Add First Asset
          </button>
        </div>
      ) : (
        <div className="assets-grid">
          {assets.map((asset) => (
            <div key={asset.id} className="card asset-card">
              <div className={`asset-icon-box ${asset.type.toLowerCase()}`}>
                {getIcon(asset.type)}
              </div>
              <div className="asset-content">
                <div className="asset-top-row">
                  <h3 className="asset-title">{asset.name}</h3>
                  <span className="asset-tag">{asset.type.replace("_", " ")}</span>
                </div>
                <p className="asset-description">{asset.description}</p>
                <div className="asset-footer">
                  <span className="asset-price">
                    {asset.value ? `₹${Number(asset.value).toLocaleString()}` : "Value not specified"}
                  </span>
                  <div className="asset-row-actions">
                    <button className="action-btn" title="Edit"><Plus size={14} style={{ transform: 'rotate(45deg)' }} /></button>
                    <button className="action-btn delete" title="Remove">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Add Asset</h2>
            <p className="welcome-subtitle mb-4">Securely record asset details for your nominees.ly.</p>
            
            <form onSubmit={handleAddAsset}>
              <div className="form-field">
                <label className="input-label">Asset Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. HDFC Savings Account"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-field">
                <label className="input-label">Type</label>
                <select 
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="BANK_ACCOUNT">Bank Account</option>
                  <option value="INVESTMENT">Investment (Stocks/MF)</option>
                  <option value="REAL_ESTATE">Real Estate</option>
                  <option value="INSURANCE">Insurance Policy</option>
                  <option value="OTHER">Other Asset</option>
                </select>
              </div>

              <div className="form-field">
                <label className="input-label">Description / Account No</label>
                <textarea 
                  className="input-field" 
                  placeholder="Additional details..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="form-field">
                <label className="input-label">Estimated Value (₹)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Record Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
