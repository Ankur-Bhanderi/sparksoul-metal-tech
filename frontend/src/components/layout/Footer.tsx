import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-800 border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-gold-500 flex items-center justify-center text-gold-500">
                <span className="font-serif font-bold text-xl">S</span>
              </div>
              <span className="font-serif text-2xl tracking-widest uppercase font-bold text-white">
                Spark<span className="text-gold-500">Soul</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Premium manufacturer and exporter of luxury brass bathroom fittings. 
              Elevating sanitaryware standards globally with unmatched craftsmanship.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-gold-500 transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Globe size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-serif text-lg mb-2">Company</h4>
            <Link href="/about" className="text-gray-400 hover:text-gold-500 transition-colors">About Us</Link>
            <Link href="/manufacturing" className="text-gray-400 hover:text-gold-500 transition-colors">Manufacturing Process</Link>
            <Link href="/certifications" className="text-gray-400 hover:text-gold-500 transition-colors">Certifications</Link>
            <Link href="/export" className="text-gray-400 hover:text-gold-500 transition-colors">Export Services</Link>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-serif text-lg mb-2">Products</h4>
            <Link href="/products/basins" className="text-gray-400 hover:text-gold-500 transition-colors">Basin Mixers</Link>
            <Link href="/products/showers" className="text-gray-400 hover:text-gold-500 transition-colors">Showers</Link>
            <Link href="/products/accessories" className="text-gray-400 hover:text-gold-500 transition-colors">Brass Accessories</Link>
            <Link href="/catalogs" className="text-gray-400 hover:text-gold-500 transition-colors">Download Catalog</Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-serif text-lg mb-2">Contact</h4>
            <div className="flex gap-3 text-gray-400">
              <MapPin size={20} className="text-gold-500 shrink-0" />
              <span>123 Industrial Area, Rajkot, Gujarat, India - 360002</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={20} className="text-gold-500 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={20} className="text-gold-500 shrink-0" />
              <span>exports@sparksoulmetal.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} SparkSoul Metal Tech Private Ltd.. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
