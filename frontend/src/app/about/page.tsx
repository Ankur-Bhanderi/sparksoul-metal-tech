"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Globe, Users, Target } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "25+", label: "Years Experience", icon: <Award className="text-gold-500" size={32} /> },
    { value: "50+", label: "Countries Exported", icon: <Globe className="text-gold-500" size={32} /> },
    { value: "1000+", label: "Skilled Artisans", icon: <Users className="text-gold-500" size={32} /> },
    { value: "5M+", label: "Fittings Annually", icon: <Target className="text-gold-500" size={32} /> },
  ];

  return (
    <div className="bg-luxury-900 min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-luxury-800 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-gold-500 font-semibold tracking-widest uppercase mb-4 text-sm block">Our Legacy</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Shaping Brass into Timeless Elegance
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Founded in the industrial heart of India, SparkSoul Metal Tech has grown from a humble casting workshop into a premier global manufacturer of luxury sanitaryware. We blend centuries-old metallurgy wisdom with cutting-edge German machining technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/10 bg-luxury-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-luxury-800 rounded-lg border border-white/5"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-serif text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 uppercase tracking-wider text-xs font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative h-[500px] w-full">
              <Image 
                src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1954&auto=format&fit=crop"
                alt="Corporate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay"></div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif text-white mb-6">Our Vision & Mission</h2>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                <strong className="text-white font-medium">Vision:</strong> To be the undisputed global leader in luxury brass bathroom fittings, setting benchmarks in quality, design, and sustainability.
              </p>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                <strong className="text-white font-medium">Mission:</strong> We are committed to manufacturing products that don't just function flawlessly, but elevate the aesthetic of any space they inhabit. Through continuous innovation, ethical manufacturing, and uncompromising quality control, we deliver value to our dealers and end-users worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
