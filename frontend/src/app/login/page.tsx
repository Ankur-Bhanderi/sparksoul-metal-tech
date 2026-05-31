"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        // Save token to localStorage (or cookies in a real prod app)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful! Welcome, " + data.user.name);
        
        // Redirect based on role
        if (data.user.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
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
            <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your dealer account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold">Password</label>
                <a href="#" className="text-xs text-gold-500 hover:text-white transition-colors">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-gold-500 text-luxury-900 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 mt-4">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-400 text-sm">
              Don't have an account? <Link href="/register" className="text-gold-500 hover:text-white transition-colors font-semibold">Apply for Dealer Account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
