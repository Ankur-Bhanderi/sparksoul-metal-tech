"use client";

import { Package, MessageSquare, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Products", value: "124", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Pending Inquiries", value: "18", icon: MessageSquare, color: "text-gold-500", bg: "bg-yellow-50" },
    { title: "Registered Dealers", value: "45", icon: Users, color: "text-green-500", bg: "bg-green-50" },
    { title: "Monthly Visitors", value: "2.4k", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-luxury-900 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-bold text-luxury-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-serif text-luxury-900 mb-6 pb-4 border-b border-gray-100">Recent Inquiries</h2>
        
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="flex flex-col">
                <span className="font-semibold text-luxury-900">John Doe Enterprises</span>
                <span className="text-sm text-gray-500">Requested a quote for Royal Gold Basin Mixer</span>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold uppercase tracking-wider rounded-full">
                Pending
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
