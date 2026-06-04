"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, UserCheck, Shield, Trash2, Edit, X, Save } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sparksoulmetaltech-backend.onrender.com/api/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`https://sparksoulmetaltech-backend.onrender.com/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleRoleChange = async (id: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "DEALER" : "ADMIN";
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    try {
      const res = await fetch(`https://sparksoulmetaltech-backend.onrender.com/api/admin/users/${id}/role`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      } else {
        alert("Failed to change user role");
      }
    } catch (error) {
      alert("Error changing user role");
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await fetch(`https://sparksoulmetaltech-backend.onrender.com/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingUser.name, email: editingUser.email, company: editingUser.company })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        setEditingUser(null);
      } else {
        alert("Failed to save user details");
      }
    } catch (error) {
      alert("Error saving user");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-luxury-900">User Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
            <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Name & Email</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Joined</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-luxury-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </td>
                  <td className="p-4 text-gray-600">{user.company || "-"}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRoleChange(user.id, user.role)}
                      className={`flex items-center gap-1 w-max px-3 py-1 rounded text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}
                      title="Click to toggle role"
                    >
                      {user.role === 'ADMIN' ? <ShieldAlert size={14}/> : <UserCheck size={14}/>}
                      {user.role}
                    </button>
                  </td>
                  <td className="p-4">
                    {user.isVerified ? (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1"><Shield size={14}/> Verified</span>
                    ) : (
                      <span className="text-gray-400 text-sm">Unverified</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => setEditingUser(user)} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-semibold text-luxury-900">Edit User Details</h2>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Full Name</label>
                <input 
                  type="text" required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Email Address</label>
                <input 
                  type="email" required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Company Name</label>
                <input 
                  type="text"
                  value={editingUser.company || ""}
                  onChange={(e) => setEditingUser({...editingUser, company: e.target.value})}
                  className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors">Cancel</button>
                <button type="submit" className="bg-luxury-900 text-gold-500 px-6 py-2 rounded font-semibold flex items-center gap-2 hover:bg-gold-500 hover:text-luxury-900 transition-colors">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
