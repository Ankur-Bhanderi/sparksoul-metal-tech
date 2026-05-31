"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Hammer, Droplet, ShieldCheck, Factory } from "lucide-react";

export default function ManufacturingPage() {
  const processes = [
    {
      title: "Casting & Forging",
      desc: "We start with 100% pure virgin brass ingots. Using advanced gravity casting and forging techniques, we ensure the structural integrity of every fitting.",
      icon: <Factory size={32} className="text-gold-500" />,
      img: "https://images.unsplash.com/photo-1565439387413-568eb5fb4138?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "CNC Machining",
      desc: "Our state-of-the-art CNC machines shape the brass with microscopic precision. This guarantees smooth operation and perfect thread alignments.",
      icon: <Hammer size={32} className="text-gold-500" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Polishing & Electroplating",
      desc: "Each product undergoes a rigorous 7-layer electroplating process. From copper and nickel base layers to the final chrome or gold finish, we guarantee lasting brilliance.",
      icon: <Droplet size={32} className="text-gold-500" />,
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Quality Testing",
      desc: "Every fitting is subjected to extreme pressure tests, salt spray tests for corrosion resistance, and flow rate checks before packaging.",
      icon: <ShieldCheck size={32} className="text-gold-500" />,
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-luxury-900 min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2014&auto=format&fit=crop"
          alt="Factory"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-900 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Our Manufacturing <span className="text-gold-500 italic">Process</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A symphony of traditional craftsmanship and modern technology.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container mx-auto px-6 mt-16">
        <div className="space-y-24">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="md:w-1/2 relative h-80 md:h-[450px] w-full">
                <div className="absolute inset-0 border-2 border-gold-500/20 translate-x-4 translate-y-4"></div>
                <Image
                  src={process.img}
                  alt={process.title}
                  fill
                  className="object-cover z-10 relative"
                />
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-luxury-800 rounded-full border border-white/10">
                    {process.icon}
                  </div>
                  <h2 className="text-3xl font-serif text-white">{process.title}</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {process.desc}
                </p>
                <div className="h-px w-full bg-gradient-to-r from-gold-500 to-transparent opacity-50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
