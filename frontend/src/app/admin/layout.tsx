"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LayoutDashboard, Package, MessageSquare, Users, Settings, LogOut, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== "ADMIN") {
          window.location.href = "/login";
        } else {
          setUser(parsedUser);
          setIsAuthorized(true);
        }
      } catch(e) {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!isAuthorized) {
    return <div className="min-h-screen bg-luxury-900 flex items-center justify-center text-gold-500 font-serif text-xl tracking-widest uppercase">Verifying Security Access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-900 text-white flex flex-col border-r border-white/10">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <h1 className="text-xl font-serif font-bold text-white tracking-widest uppercase">
            SparkSoul <span className="text-gold-500 italic">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold-500/10 text-gold-500 font-semibold transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Package size={20} />
            Products
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare size={20} />
            Inquiries
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Users size={20} />
            Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={20} />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition-colors w-full">
            <Home size={20} />
            Back to Website
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors w-full text-left">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-luxury-900">Admin Control Panel</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-luxury-800 text-gold-500 flex items-center justify-center font-bold font-serif uppercase">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-luxury-900">{user?.name || "Admin User"}</p>
              <p className="text-gray-500 text-xs">{user?.email || "admin@sparksoulmetal.com"}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
