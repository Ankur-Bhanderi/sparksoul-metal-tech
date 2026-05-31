"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: { name: string };
  createdAt: string;
  imageUrl: string;
  isLive: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would use the env variable for the API URL
    fetch("http://localhost:5000/api/admin/products")
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-luxury-900">Products Management</h1>
        <button className="bg-gold-500 text-luxury-900 px-6 py-2 rounded font-semibold flex items-center gap-2 hover:bg-luxury-900 hover:text-gold-500 transition-colors">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">SKU</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Added On</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No products found. Click "Add Product" to create one.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                      {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />}
                    </div>
                    <span className="font-semibold text-luxury-900">{product.name}</span>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-sm">{product.sku}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium uppercase tracking-wider">
                      {product.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      product.isLive 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}>
                      {product.isLive ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button className="text-gray-400 hover:text-blue-500 transition-colors"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
