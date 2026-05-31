"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("Dealer");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sparksoulmetaltech-backend.onrender.com";
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: inquiryType })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Inquiry submitted successfully! Our team will contact you soon.");
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          country: "",
          message: ""
        });
      } else {
        alert(data.error || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-luxury-900 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-luxury-800 py-20 border-b border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Partner with <span className="text-gold-500 italic">SparkSoul Metal Tech</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you are looking to become an authorized dealer, request an export quotation, or need project-specific manufacturing, our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Details */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-serif text-white mb-8">Corporate Headquarters</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-luxury-800 border border-gold-500/30 rounded-full shrink-0">
                  <MapPin className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-2">Factory & Head Office</h4>
                  <p className="text-gray-400 leading-relaxed">
                    SparkSoul Metal Tech Private Ltd. Unit,<br/>
                    123 Industrial Area, Phase 2,<br/>
                    Rajkot, Gujarat, India - 360002
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-luxury-800 border border-gold-500/30 rounded-full shrink-0">
                  <Phone className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-2">Phone Inquiries</h4>
                  <p className="text-gray-400">Domestic: +91 98765 43210</p>
                  <p className="text-gray-400">Exports: +91 99887 76655</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-luxury-800 border border-gold-500/30 rounded-full shrink-0">
                  <Mail className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-2">Email</h4>
                  <p className="text-gray-400">exports@sparksoulmetal.com</p>
                  <p className="text-gray-400">dealers@sparksoulmetal.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:w-2/3">
            <div className="bg-luxury-800 p-8 md:p-12 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-serif text-white mb-8">Send an Inquiry</h2>
              
              <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                {["Dealer", "Export", "Project"].map(type => (
                  <button 
                    key={type}
                    onClick={() => setInquiryType(type)}
                    className={`pb-4 px-2 -mb-[17px] font-semibold uppercase tracking-wider text-sm transition-colors ${
                      inquiryType === type 
                      ? "text-gold-500 border-b-2 border-gold-500" 
                      : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Company Name</label>
                    <input type="text" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Contact Person</label>
                    <input type="text" required value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Phone / WhatsApp</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Country / Region</label>
                  <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Message / Requirements</label>
                  <textarea rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-luxury-900 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-gold-500 text-luxury-900 px-8 py-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 w-full hover:bg-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                  <Send size={18} /> {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
