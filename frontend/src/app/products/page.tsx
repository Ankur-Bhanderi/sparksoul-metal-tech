"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: { name: string };
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Get unique categories from the products list dynamically
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)))];

  return (
    <div className="bg-luxury-900 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-luxury-800 py-20 border-b border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Our <span className="text-gold-500 italic">Collections</span></h1>
          <p className="text-gray-400">Explore our premium range of brass bathroom fittings.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider font-semibold transition-colors ${
                cat === "All" 
                ? "bg-gold-500 border-gold-500 text-luxury-900" 
                : "border-white/20 text-gray-400 hover:border-gold-500 hover:text-gold-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-serif text-xl">Loading collections...</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-serif text-xl">New collections arriving soon.</div>
          ) : (
            products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative h-96 w-full bg-luxury-800 mb-6 overflow-hidden border border-white/5 group-hover:border-gold-500/50 transition-colors">
                    {product.imageUrl ? (
                      <Image 
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 font-serif">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-luxury-900/80 backdrop-blur text-gold-500 px-3 py-1 text-xs uppercase tracking-widest font-semibold">
                      {product.category?.name || "Premium"}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-white group-hover:text-gold-500 transition-colors">{product.name}</h3>
                  <p className="text-gold-500/70 uppercase tracking-widest text-xs mt-2 font-medium">Request Quote</p>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
