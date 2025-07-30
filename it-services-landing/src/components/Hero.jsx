import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, Award, Clock } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Klien Puas' },
    { icon: Award, value: '5+', label: 'Tahun Pengalaman' },
    { icon: CheckCircle, value: '1000+', label: 'Project Selesai' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  const features = [
    'Konsultasi IT Gratis',
    'Garansi Layanan',
    'Tim Berpengalaman',
    'Harga Kompetitif'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 section-padding w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-6">
                {/* <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-yellow-400 font-medium">Dipercaya 500+ Klien</span> */}
              </div> 

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Solusi IT
                <span className="block text-yellow-400">Terpercaya</span>
                untuk Bisnis Anda
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Insan Tekno Sejahtera menyediakan layanan IT lengkap mulai dari repair komputer, instalasi jaringan, 
                CCTV, hingga pengembangan website dan aplikasi untuk mendukung kemajuan bisnis Anda.
              </p>

              {/* Features List */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#contact" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Konsultasi Gratis Sekarang
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#services" 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
                >
                  Lihat Layanan Kami
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3 mx-auto">
                      <stat.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-900" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Hardware</h3>
                    <p className="text-blue-200 text-sm">Repair & Maintenance</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-900" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Network</h3>
                    <p className="text-blue-200 text-sm">Installation & Setup</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-900" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Software</h3>
                    <p className="text-blue-200 text-sm">Development</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-900" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Design</h3>
                    <p className="text-blue-200 text-sm">Graphic Design</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;