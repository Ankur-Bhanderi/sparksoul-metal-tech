"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle, Clock } from "lucide-react";

interface Inquiry {
  id: string;
  type: string;
  companyName: string;
  contactPerson: string;
  email: string;
  country: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/inquiries")
      .then(res => res.json())
      .then(data => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch inquiries:", err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "PENDING": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "REVIEWED": return "bg-blue-100 text-blue-700 border-blue-200";
      case "RESPONDED": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-luxury-900">Inquiries & Quotes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Company / Contact</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading inquiries...</td></tr>
            ) : inquiries.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No inquiries found.</td></tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-luxury-900">{inq.companyName}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Mail size={12}/> {inq.email}</p>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">{inq.type}</td>
                  <td className="p-4 text-gray-600">{inq.country}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(inq.status)}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gold-500 hover:text-luxury-900 font-semibold text-sm uppercase tracking-wider transition-colors">
                      View Details
                    </button>
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
