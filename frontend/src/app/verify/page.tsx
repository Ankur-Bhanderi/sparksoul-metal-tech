"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      
      if (res.ok) {
        router.push("/login?verified=true");
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="bg-luxury-800 p-8 md:p-10 border border-white/10 relative overflow-hidden text-center">
      <div className="flex justify-center mb-6 relative z-10">
        <div className="p-4 bg-luxury-900 rounded-full border border-gold-500/30">
          <ShieldCheck size={40} className="text-gold-500" />
        </div>
      </div>
      
      <h1 className="text-3xl font-serif text-white mb-4 relative z-10">Verify Your Email</h1>
      <p className="text-gray-400 mb-8 relative z-10">
        We've sent a 6-digit verification code to <strong className="text-white">{email}</strong>. 
        Please enter it below to activate your account.
      </p>

      <form onSubmit={handleVerify} className="space-y-6 relative z-10 max-w-sm mx-auto">
        <div>
          <input 
            type="text" 
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-luxury-900 border border-white/10 text-white text-center tracking-[0.5em] text-2xl py-4 focus:outline-none focus:border-gold-500 transition-colors" 
            placeholder="000000"
          />
        </div>

        <button type="submit" className="w-full bg-gold-500 text-luxury-900 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300">
          Verify Account <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 text-center relative z-10">
        <p className="text-gray-400 text-sm">
          Didn't receive the code? <button onClick={async () => {
            try {
              const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
              const res = await fetch(`${apiUrl}/api/auth/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
              });
              if (res.ok) alert("A new OTP has been sent to your email!");
              else alert("Failed to resend OTP");
            } catch (e) {
              alert("Error connecting to server");
            }
          }} type="button" className="text-gold-500 hover:text-white transition-colors font-semibold">Resend OTP</button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="bg-luxury-900 min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
