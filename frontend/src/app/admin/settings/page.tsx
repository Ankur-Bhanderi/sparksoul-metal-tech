"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Save, Info, Server, Hash } from "lucide-react";

export default function AdminSettings() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("587");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.smtpHost) setHost(data.smtpHost);
        if (data.smtpPort) setPort(data.smtpPort.toString());
        if (data.smtpEmail) setEmail(data.smtpEmail);
        if (data.hasPassword) setHasPassword(true);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch settings:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          smtpHost: host, 
          smtpPort: Number(port), 
          smtpEmail: email, 
          smtpPassword: password || undefined 
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: "Email settings saved successfully!" });
        if (password) setHasPassword(true);
        setPassword(""); // Clear password field after saving for security UX
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save settings" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-luxury-900">System Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-semibold text-luxury-900 flex items-center gap-2">
            <Mail size={20} className="text-gold-500" />
            Email Transport Configuration
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Configure the email address used to send One-Time Passwords (OTPs) to newly registered users. 
            We recommend using a Gmail account with an "App Password".
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <Info size={18} /> {message.text}
            </div>
          )}

          {loading ? (
            <div className="py-4 text-gray-500">Loading settings...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">SMTP Host</label>
                  <div className="relative">
                    <Server className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      className="w-full bg-white border border-gray-200 text-luxury-900 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" 
                      placeholder="e.g. smtp.resend.com or smtp.gmail.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">SMTP Port</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number" 
                      required
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      className="w-full bg-white border border-gray-200 text-luxury-900 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" 
                      placeholder="465 or 587"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">SMTP Email Address / Username</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-luxury-900 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" 
                    placeholder="resend or admin@yourcompany.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-600 font-semibold">SMTP Password / API Key</label>
                  {hasPassword && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Password Configured ✓</span>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-luxury-900 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" 
                    placeholder={hasPassword ? "•••••••••••••••• (Leave blank to keep current)" : "Enter API Key or SMTP Password"}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You can use Resend, SendGrid, or any other SMTP provider. If using Gmail, you must generate an App Password.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-luxury-900 text-gold-500 px-6 py-3 rounded font-semibold flex items-center gap-2 hover:bg-gold-500 hover:text-luxury-900 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : <><Save size={18} /> Save Settings</>}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
