import React from 'react';
import { 
  Target, 
  Heart, 
  Shield,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Profesional',
      description: 'Kami berkomitmen memberikan layanan IT dengan standar profesional tertinggi dan solusi yang tepat sasaran.'
    },
    {
      icon: Heart,
      title: 'Terpercaya',
      description: 'Kepercayaan klien adalah prioritas utama. Kami menjaga komitmen dan memberikan hasil terbaik setiap waktu.'
    },
    {
      icon: Shield,
      title: 'Berkualitas',
      description: 'Menggunakan teknologi terdepan dan best practices untuk memastikan kualitas layanan yang superior.'
    }
  ];

  const clients = [
    {
      name: 'Cipta Solusi Cendikia',
      link: 'https://taskia.id',
      image: 'https://taskia.id/public/img/logo.png',
      description: 'Landing Page'
    },
    {
      name: 'Yayasan Cahaya Ayah Bunda',
      link: 'https://cahayaayahbunda.org',
      image: 'https://cahayaayahbunda.org/wp-content/uploads/2025/05/ycba-form.png',
      description: 'Landing Page'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Tentang <span className="text-primary-600">Insan Tekno Sejahtera</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Partner teknologi yang fokus pada kualitas dan kepuasan klien. 
            Kami hadir untuk memberikan solusi teknologi yang tepat guna.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-secondary-900 mb-6">
              Mengapa Memilih Kami?
            </h3>
            <p className="text-secondary-600 mb-8 leading-relaxed">
              Insan Tekno Sejahtera adalah perusahaan teknologi yang berfokus pada 
              pengembangan solusi IT yang efektif dan efisien. Kami percaya bahwa 
              teknologi yang tepat dapat mendorong pertumbuhan bisnis Anda.
            </p>
            
            <div className="space-y-6 mb-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 mb-2">{value.title}</h4>
                    <p className="text-secondary-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Konsultasi Gratis
              </a>
              <a href="#services" className="btn-secondary">
                Lihat Layanan
              </a>
            </div>
          </div>

          {/* Right Content - Clients */}
          <div className="bg-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
              Klien Kami
            </h3>
            <div className="space-y-6">
              {clients.map((client, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <img src={client.image} alt={client.name} className="w-12 h-12" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900"><a href={client.link} target="_blank" rel="noopener noreferrer">{client.name}</a></h4>
                      <p className="text-secondary-600 text-sm">{client.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;