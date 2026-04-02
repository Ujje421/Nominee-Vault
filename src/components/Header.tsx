"use client";

import { Bell, Search, User } from "lucide-react";
import { useSession } from "next-auth/react";
import "./Header.css";

export default function Header({ title }: { title: string }) {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search vault..." className="search-input" />
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">Vault Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
