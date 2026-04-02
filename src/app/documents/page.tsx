"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Plus, FileText, Download, Trash2, Loader2, Upload, Eye, ShieldCheck, FileIcon } from "lucide-react";
import "./Documents.css";

type Document = {
  id: string;
  name: string;
  type: string;
  category: string;
  createdAt: string;
  size: number;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("IDENTITY");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("name", file.name);

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setShowModal(false);
        setFile(null);
        fetchDocuments();
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AppLayout title="Documents">
      <div className="docs-header">
        <div className="header-info">
          <h2>Secure Vault</h2>
          <p className="docs-subtitle">Bank-grade encryption for your most vital files.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Upload New
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : documents.length === 0 ? (
        <div className="card empty-vault">
          <ShieldCheck size={48} className="empty-vault-icon" />
          <h3>No documents secured</h3>
          <p>Upload your Will, ID cards, or Insurance policies to ensure your family's future.</p>
          <button className="btn btn-primary btn-sm mt-4" onClick={() => setShowModal(true)}>
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="card docs-list-card">
          <table className="vault-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date Added</th>
                <th>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="file-name-cell">
                      <FileIcon size={18} className="file-icon" />
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td><span className="doc-category-tag">{doc.category}</span></td>
                  <td>{new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>{formatSize(doc.size)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn" title="View"><Eye size={16} /></button>
                      <button className="action-btn" title="Download"><Download size={16} /></button>
                      <button className="action-btn delete" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Secure Upload</h2>
            <p className="welcome-subtitle mb-4">Files are encrypted locally using AES-256-GCM before arrival.ly.</p>
            
            <form onSubmit={handleUpload}>
              <div className="upload-zone" onClick={() => document.getElementById('file-input')?.click()}>
                <Upload size={24} className="text-primary" />
                <p>{file ? file.name : "Select or drop file"}</p>
                <input 
                  id="file-input"
                  type="file" 
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="form-field">
                <label className="input-label">Category</label>
                <select 
                  className="input-field" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="IDENTITY">Government ID</option>
                  <option value="LEGAL">Legal Documents</option>
                  <option value="FINANCIAL">Financial Records</option>
                  <option value="MEDICAL">Medical History</option>
                  <option value="INSURANCE">Insurance Policies</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={!file || uploading}>
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : "Encrypt & Securely Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
