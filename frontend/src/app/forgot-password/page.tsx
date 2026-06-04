"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
      const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setTimeout(() => {
          window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to process request");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="bg-luxury-900 min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-luxury-800 p-8 md:p-10 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h1 className="text-3xl font-serif text-white mb-2">Forgot Password</h1>
            <p className="text-gray-400">Enter your email to receive a reset code</p>
          </div>

          <form onSubmit={handleRequestReset} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" 
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm">{message}</p>
            )}
            {status === "success" && (
              <p className="text-green-500 text-sm">{message}</p>
            )}

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full bg-gold-500 text-luxury-900 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 mt-4 disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Redirecting..." : "Send Reset Code"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-400 text-sm">
              Remember your password? <Link href="/login" className="text-gold-500 hover:text-white transition-colors font-semibold">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
