import React from 'react';
import { 
  Monitor, 
  Wifi, 
  Camera, 
  Code, 
  Palette, 
  Wrench, 
  Server, 
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Repair Komputer',
      description: 'Perbaikan dan maintenance komputer, laptop, dan perangkat IT lainnya dengan teknisi berpengalaman.',
      features: [
        'Diagnosa kerusakan hardware & software',
        'Perbaikan motherboard, RAM, HDD/SSD',
        'Instalasi sistem operasi',
        'Maintenance berkala'
      ],
      price: 'Mulai dari Rp 50.000',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wifi,
      title: 'Instalasi Jaringan',
      description: 'Pemasangan dan konfigurasi jaringan LAN, WiFi, dan infrastruktur IT untuk kantor dan rumah.',
      features: [
        'Instalasi kabel UTP & Fiber Optic',
        'Konfigurasi router & switch',
        'Setup WiFi enterprise',
        'Network security'
      ],
      price: 'Mulai dari Rp 200.000',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Camera,
      title: 'CCTV & Security',
      description: 'Pemasangan sistem CCTV dan keamanan digital untuk monitoring dan proteksi properti Anda.',
      features: [
        'CCTV analog & IP camera',
        'DVR/NVR system',
        'Remote monitoring',
        'Motion detection & alert'
      ],
      price: 'Mulai dari Rp 500.000',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Monitor,
      title: 'Penyediaan Perangkat',
      description: 'Penjualan komputer, laptop, proyektor, dan perangkat IT berkualitas dengan harga kompetitif.',
      features: [
        'PC Desktop & Laptop',
        'Proyektor & Screen',
        'Printer & Scanner',
        'Aksesoris IT lengkap'
      ],
      price: 'Harga Kompetitif',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Code,
      title: 'Website & Aplikasi',
      description: 'Pembuatan website profesional dan aplikasi mobile untuk mendukung digitalisasi bisnis Anda.',
      features: [
        'Website company profile',
        'E-commerce & toko online',
        'Aplikasi mobile Android/iOS',
        'Sistem informasi custom'
      ],
      price: 'Mulai dari Rp 1.500.000',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Palette,
      title: 'Desain Grafis',
      description: 'Jasa desain grafis profesional untuk branding, marketing, dan kebutuhan visual bisnis Anda.',
      features: [
        'Logo & brand identity',
        'Brosur & flyer',
        'Banner & poster',
        'Social media content'
      ],
      price: 'Mulai dari Rp 100.000',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section id="services" className="section-padding bg-secondary-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Layanan <span className="text-primary-600">Profesional</span> Kami
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Solusi IT lengkap untuk semua kebutuhan teknologi bisnis dan personal Anda. 
            Didukung oleh tim ahli berpengalaman dan teknologi terdepan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Mulai dari</div>
                    <div className="font-bold">{service.price}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-semibold text-secondary-900 mb-4">Yang Kami Tawarkan:</h4>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full bg-secondary-100 hover:bg-primary-600 hover:text-white text-secondary-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group">
                  Konsultasi Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Butuh Solusi IT Custom?
            </h3>
            <p className="text-secondary-600 mb-6">
              Kami siap membantu merancang solusi IT yang sesuai dengan kebutuhan spesifik bisnis Anda. 
              Konsultasi gratis dengan tim ahli kami sekarang juga!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                Konsultasi Gratis
              </a>
              <a href="tel:+6281234567890" className="btn-secondary">
                Hubungi Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;