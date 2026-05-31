"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ShieldCheck, Truck, Check } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  // In a real app, fetch based on resolvedParams.id
  const product = {
    name: "Royal Gold Basin Mixer",
    category: "Basin Mixers",
    sku: "BM-RG-001",
    desc: "A masterpiece of engineering and design. This basin mixer features a solid brass body, ceramic disc cartridge for drip-free performance, and a stunning 7-layer gold electroplated finish.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    specs: [
      { label: "Material", value: "100% Virgin Brass" },
      { label: "Finish", value: "Gold / Chrome / Antique Brass" },
      { label: "Cartridge", value: "Ceramic Disc (500,000 cycles)" },
      { label: "Water Pressure", value: "0.5 - 5 Bar" },
      { label: "Warranty", value: "10 Years" }
    ]
  };

  return (
    <div className="bg-luxury-900 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 mb-12 transition-colors uppercase tracking-wider text-sm font-semibold">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="relative h-[600px] w-full border border-white/10 bg-luxury-800 p-8">
              <Image 
                src={product.img}
                alt={product.name}
                fill
                className="object-cover p-4"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-24 h-24 relative border-2 border-gold-500 cursor-pointer">
                <Image src={product.img} alt="Thumbnail 1" fill className="object-cover" />
              </div>
              <div className="w-24 h-24 relative border border-white/20 cursor-pointer hover:border-gold-500 transition-colors opacity-50 hover:opacity-100">
                <Image src={product.img} alt="Thumbnail 2" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-2 text-gold-500 font-semibold tracking-widest uppercase text-sm">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{product.name}</h1>
            <p className="text-gray-500 font-mono mb-8">SKU: {product.sku}</p>

            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {product.desc}
            </p>

            <div className="bg-luxury-800 p-8 border border-white/5 mb-10">
              <h3 className="text-xl font-serif text-white mb-6 border-b border-white/10 pb-4">Technical Specifications</h3>
              <ul className="space-y-4">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" className="bg-gold-500 text-luxury-900 px-8 py-4 font-semibold uppercase tracking-wider text-center hover:bg-white transition-colors flex-1">
                Request Quote
              </Link>
              <button className="border border-white/20 text-white px-8 py-4 font-semibold uppercase tracking-wider text-center hover:border-gold-500 hover:text-gold-500 transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> Catalog PDF
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck size={20} className="text-gold-500" />
                <span className="text-sm">10 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Truck size={20} className="text-gold-500" />
                <span className="text-sm">Global Export</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Check size={20} className="text-gold-500" />
                <span className="text-sm">100% Quality Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
