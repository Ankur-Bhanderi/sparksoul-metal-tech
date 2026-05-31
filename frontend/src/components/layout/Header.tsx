"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{role: string} | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Read user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch(e) {}
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-luxury-900/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-gold-500 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-luxury-900 transition-colors duration-300">
            <span className="font-serif font-bold text-xl">S</span>
          </div>
          <span className="font-serif text-2xl tracking-widest uppercase font-bold text-white">
            Spark<span className="text-gold-500">Soul</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-sm uppercase tracking-wider text-gray-300 hover:text-gold-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user?.role === "ADMIN" ? (
            <>
              <Link
                href="/admin"
                className="text-sm uppercase tracking-wider text-gold-500 hover:text-white transition-colors mr-2 font-bold"
              >
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm uppercase tracking-wider text-gray-400 hover:text-red-400 transition-colors mr-2">
                Log Out
              </button>
            </>
          ) : user ? (
            <>
              <Link
                href="/products" // Currently non-admin users just browse products
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-gold-500 transition-colors mr-2"
              >
                My Account
              </Link>
              <button onClick={handleLogout} className="text-sm uppercase tracking-wider text-gray-400 hover:text-red-400 transition-colors mr-2">
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm uppercase tracking-wider text-gray-300 hover:text-gold-500 transition-colors mr-2"
            >
              Dealer Login
            </Link>
          )}
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm text-gold-500 border border-gold-500 px-4 py-2 hover:bg-gold-500 hover:text-luxury-900 transition-all duration-300"
          >
            <PhoneCall size={16} />
            <span>Request Quote</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-gold-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-luxury-900 border-b border-white/10 md:hidden"
        >
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-300 hover:text-gold-500 text-lg uppercase tracking-wide py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user?.role === "ADMIN" ? (
              <>
                <Link
                  href="/admin"
                  className="text-gold-500 hover:text-white text-lg uppercase tracking-wide py-2 border-b border-white/5 font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-left text-red-400 hover:text-red-300 text-lg uppercase tracking-wide py-2 border-b border-white/5"
                >
                  Log Out
                </button>
              </>
            ) : user ? (
              <>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-gold-500 text-lg uppercase tracking-wide py-2 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-left text-red-400 hover:text-red-300 text-lg uppercase tracking-wide py-2 border-b border-white/5"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-gold-500 text-lg uppercase tracking-wide py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dealer Login
              </Link>
            )}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 mt-4 text-luxury-900 bg-gold-500 px-4 py-3 font-semibold uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
