"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="bg-luxury-800 p-8 md:p-10 border border-white/10 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl font-serif text-white mb-2">Reset Password</h1>
        <p className="text-gray-400">Enter your 6-digit code and new password</p>
        <p className="text-gold-500 text-sm mt-2">{email}</p>
      </div>

      <form onSubmit={handleReset} className="space-y-6 relative z-10">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Reset Code</label>
          <input 
            type="text" 
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-luxury-900 border border-white/10 text-white text-center tracking-[0.5em] text-xl py-4 focus:outline-none focus:border-gold-500 transition-colors" 
            placeholder="000000"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">New Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-12 py-4 focus:outline-none focus:border-gold-500 transition-colors" 
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}
        {status === "success" && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className="w-full bg-gold-500 text-luxury-900 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 mt-4 disabled:opacity-70"
        >
          {status === "loading" ? "Resetting..." : status === "success" ? "Redirecting..." : "Reset Password"} <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="bg-luxury-900 min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
