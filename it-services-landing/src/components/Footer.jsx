import React from 'react';
import { 
  Monitor, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Kontak', href: '#contact' }
  ];

  const services = [
    { name: 'Repair Komputer', href: '#services' },
    { name: 'Instalasi Jaringan', href: '#services' },
    { name: 'CCTV & Security', href: '#services' },
    { name: 'Website & Aplikasi', href: '#services' },
    { name: 'Desain Grafis', href: '#services' },
    { name: 'Konsultasi IT', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div>
                  <img src="/its-logo.png" alt="Insan Tekno Sejahtera" className="w-20 h-15" />
                  <p className="text-xs text-secondary-400">Insan Tekno Sejahtera</p>
                </div>
              </div>
              <p className="text-secondary-300 mb-6 leading-relaxed">
                Partner terpercaya untuk semua kebutuhan IT Anda. Kami menyediakan solusi 
                teknologi lengkap dengan layanan profesional dan berkualitas tinggi.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Menu Utama</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Layanan Kami</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            {/* <div>
              <h4 className="text-lg font-semibold mb-6">Hubungi Kami</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-secondary-300">+62 812-3456-7890</p>
                    <p className="text-secondary-300">+62 821-9876-5432</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-secondary-300">info@insansejahtera.com</p>
                    <p className="text-secondary-300">support@insansejahtera.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-secondary-300">Jl. Teknologi No. 123</p>
                    <p className="text-secondary-300">Jakarta Selatan, 12345</p>
                  </div>
                </div>
              </div>

              // Emergency Contact 
               <div className="mt-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                <h5 className="text-red-400 font-semibold mb-2">🚨 Emergency Support</h5>
                <p className="text-red-300 text-sm mb-2">24/7 untuk kebutuhan darurat</p>
                <a 
                  href="tel:+6281234567890"
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  +62 812-3456-7890
                </a>
              </div> 
            </div> */}
          </div>

          {/* Newsletter Subscription */}
          {/* <div className="border-t border-secondary-800 pt-8 mb-8">
            <div className="bg-secondary-800 rounded-2xl p-6 text-center">
              <h4 className="text-xl font-semibold mb-2">
                Dapatkan Update Terbaru
              </h4>
              <p className="text-secondary-300 mb-6">
                Berlangganan newsletter kami untuk mendapatkan tips IT dan penawaran khusus
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-3 bg-secondary-700 border border-secondary-600 rounded-lg text-white placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  Berlangganan
                </button>
              </div>
            </div>
          </div> */}

          {/* Bottom Footer */}
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-secondary-400 text-sm mb-4 md:mb-0">
              © 2025 Insan Tekno Sejahtera. All rights reserved. Dibuat dengan ❤️ untuk kemajuan teknologi Indonesia.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;