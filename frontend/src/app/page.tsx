"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
            alt="Luxury Bathroom"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-900 via-luxury-900/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <span className="text-gold-500 font-semibold tracking-widest uppercase mb-4 text-sm">
              Premium Brass Manufacturing
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Elegance Crafted in <span className="text-gold-500 italic">Brass</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
              Elevate your spaces with world-class brass bathroom fittings and accessories. Manufactured in India, exported globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-gold-500 text-luxury-900 px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Explore Collection <ArrowRight size={20} />
              </Link>
              <Link
                href="/manufacturing"
                className="border border-white/30 text-white px-8 py-4 font-semibold uppercase tracking-wider hover:border-gold-500 hover:text-gold-500 transition-colors duration-300 flex items-center justify-center"
              >
                Our Process
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-luxury-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Signature Collections
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Basin Mixers", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" },
              { title: "Luxury Showers", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop" },
              { title: "Brass Accessories", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative h-96 overflow-hidden bg-luxury-800 block cursor-pointer"
              >
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-900/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">{category.title}</h3>
                  <div className="flex items-center gap-2 text-gold-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm uppercase tracking-wider font-semibold">View Products</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="py-24 bg-luxury-800 relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative h-[600px] w-full border border-gold-500/30 p-2">
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
                  alt="Manufacturing Process"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute -bottom-8 -right-8 bg-luxury-900 p-8 border border-white/10 hidden md:block">
                  <p className="text-5xl font-serif text-gold-500 mb-2">25+</p>
                  <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Years of Mastery</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <span className="text-gold-500 font-semibold tracking-widest uppercase mb-4 text-sm block">
                Uncompromising Quality
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Precision Engineered in Every Detail
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                From raw brass ingots to the final polished masterpiece, every step of our manufacturing process is tightly controlled in-house. We utilize advanced CNC machining, rigorous pressure testing, and multi-layer electroplating to guarantee exceptional durability and a flawless finish.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  "100% Pure Virgin Brass",
                  "Advanced CNC Machining",
                  "7-Layer Electroplating",
                  "10-Year Warranty Guarantee"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-gold-500 shrink-0" size={24} />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-wider font-semibold text-sm"
              >
                Explore Our Facility <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
