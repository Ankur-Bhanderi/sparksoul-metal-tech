"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Mail, Lock, Building, Phone, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        // TEMPORARY: OTP flow disabled
        // localStorage.setItem("verifyEmail", email);
        // window.location.href = "/verify";
        
        alert("Registration successful! You can now log in.");
        window.location.href = "/login";
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="bg-luxury-900 min-h-screen flex items-center justify-center pt-28 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-luxury-800 p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h1 className="text-3xl font-serif text-white mb-2">Dealer Application</h1>
            <p className="text-gray-400">Register to access B2B pricing, catalogs, and bulk ordering.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input type="text" name="name" required onChange={handleChange} className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" placeholder="John Doe" />
                </div>
              </div>

              <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Company Name (Optional)</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" 
                  placeholder="Your Company Ltd."
                />
              </div>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input type="email" name="email" required onChange={handleChange} className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" placeholder="contact@company.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" placeholder="+1 234 567 8900" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="password" name="password" required onChange={handleChange} className="w-full bg-luxury-900 border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-gold-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full bg-gold-500 text-luxury-900 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 mt-4">
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-400 text-sm">
              Already have a dealer account? <Link href="/login" className="text-gold-500 hover:text-white transition-colors font-semibold">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
